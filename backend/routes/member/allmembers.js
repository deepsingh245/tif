const express = require("express");
// const { body, validationResult } = require("express-validator");
const member = require("../../models/member");
const role = require("../../models/role");
const user = require("../../models/user");
const community = require("../../models/community");
const router = express.Router();
const Snowflake = require("@theinternetfolks/snowflake");


router.get("/community/:id/members", (req, res) => {
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

module.exports = router