const express = require("express");
const { body, validationResult } = require("express-validator");
const role = require("../../models/role");
const router = express.Router();
const Snowflake = require("@theinternetfolks/snowflake");

router.post(
  "/role",
  [body("name").isLength({ min: 2 })],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const snowflake = Snowflake.Snowflake.generate();
      let data = new role({
        id: snowflake,
        name: req.body.name,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
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

router.get("/role", (req, res) => {
  role
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
});

module.exports = router;
