const express = require("express");
const { body, validationResult } = require("express-validator");
const community = require("../../models/community");
const router = express.Router();
const user = require("../../models/user");
const Snowflake = require("@theinternetfolks/snowflake");
var jwt = require("jsonwebtoken");
var slug = require("slug");

router.post(
  "/community",
  [body("name", "Name should be at least 2 characters.").isLength({ min: 2 })],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let access_token = jwt.sign({ id: "7157040184298042757" }, "key", {
        expiresIn: "1h",
      });
      // console.log(access_token)
      let token = req.header("Authorization");
      const User = jwt.verify(access_token, "key");
      const owner = User.id;
      const { name } = req.body;
      const snowflake = Snowflake.Snowflake.generate();
      const theslug = slug(name);
      const created_at = Date.now();
      const updated_at = Date.now();
      let data = new community({
        id: snowflake,
        name: name,
        slug: theslug,
        owner: owner,
        created_at: created_at,
        updated_at: updated_at,
      });
      data.save();
      res.json({
        status: "success",
        content: { data },
      });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);


router.get("/community",(req,res)=>{
  community
  .find({})
  .then((data) =>
    res.json({
      success: true,
      content: { meta: { total: data.length, pages: 1, page: 1 }, data },
    })
  )
  .catch((err) => {
    res.json(err);
  });
})

router.get("/community/:id/members",(req,res)=>{
  community
  .find({})
  .then((data) =>
    res.json({
      success: true,
      content: { meta: { total: data.length, pages: 1, page: 1 }, data },
    })
  )
  .catch((err) => {
    res.json(err);
  });
})


module.exports = router;
