const express = require("express");
// const { body, validationResult } = require("express-validator");
const member = require("../../models/member");
const router = express.Router();
const Snowflake = require("@theinternetfolks/snowflake");

router.post(
  "/member",
  (req, res) => {
    try {
      const snowflake = Snowflake.Snowflake.generate();
      let data = new member({
        id: snowflake,
        community: req.body.community,
        user: req.body.user,
        role: req.body.role,
        created_at: Date.now(),
      });
      data.save();
      res.json({
        status: true,
        content: { data },
      });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);

module.exports = router