const express = require("express");
const { body, validationResult } = require("express-validator");
const user = require("../../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Snowflake = require("@theinternetfolks/snowflake");

router.post(
  "/auth/signup",
  [
    body("email").isEmail(),
    body("name", "Name should be at least 2 characters.").isLength({ min: 2 }),
    body("password", "Password should be at least 2 characters.").isLength({
      min: 8,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, created_at } = req.body;
      const existingUser = await user.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          status: false,
          errors: [
            {
              param: "email",
              message: "User with this email address already exists.",
              code: "RESOURCE_EXISTS",
            },
          ],
        });
      }
      const snowflake = Snowflake.Snowflake.generate();
      const hashedPassword = await bcrypt.hash(password, 10);
      let data = new user({
        id: snowflake,
        name: name,
        email: email,
        password: hashedPassword,
        created_at: created_at,
      });
      data.save();
      const access_token = jwt.sign(
        { id: data.id, email: data.email },
        "token"
      );
      res.json({
        status: true,
        content: {
          data: {
            id: data.id,
            name: data.name,
            email: data.email,
            created_at: data.created_at,
          },
          meta: { access_token },
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);

//signin -------------------
router.post(
  "/auth/signin",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 8 }),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let mailid = req.body.email;
    try {
      let prevUser = user.findOne({ email: mailid }).exec();

      prevUser.then((data) => {
        console.log(data);
        if (!data) {
          return res.status(400).json({ msg: "Invalid Email or Password" });
        }

        //checking the password
        bcrypt
          .compare(req.body.password, data.password)
          .then(function (isMatch) {
            if (!isMatch) {
              return res
                .status(400)
                .json({
                  message: "Invalid Email or Password",
                  pwd: data.password,
                });
            } else {
              let access_token = jwt.sign({ id: data.id }, "key", {
                expiresIn: "1h",
              });
              console.log(jwt.verify(access_token, "key"));
              res.json({
                status: true,
                content: {
                  data: {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    created_at: data.created_at,
                  },
                  meta: { access_token },
                },
              });
            }
          });
      });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);

router.get("/auth/me", (req, res) => {
  let access_token = jwt.sign({ id: "7157040184298042757" }, "key", {
    expiresIn: "1h",
  });
  console.log(access_token);
  let token = req.header("Authorization");
  // verifying the token
  if (!token) {
    return res
      .status(401)
      .json({
        errors: [
          { message: "You need to sign in to proceed.", code: "NOT_SIGNEDIN" },
        ],
      });
  }
  try {
    const User = jwt.verify(access_token, "key");
    console.log(User);
    // const user_id = User.id
    user
      .findOne({ id: User.id })
      .select("-password")
      .exec()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Server Error" });
      });
  } catch (error) {
    res.status(500).json({ msg: "Token is not Valid" });
  }
});

module.exports = router;
