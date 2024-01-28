const express = require("express");
// const { body, validationResult } = require("express-validator");
const member = require("../../models/member");
// const role = require("../../models/role");
// const user = require("../../models/user");
// const community = require("../../models/community");
const router = express.Router();
// const Snowflake = require("@theinternetfolks/snowflake");

router.get("/community/members", (req, res) => {
  const community = req.body.community;
  const members = member.find({}).select("-__v").exec();
  try {
    members.then((data)=>{
        if (!data) {
            res.json({
              success: false,
              message: "No Members Found",
            });
          } else {
            res.json({
              success: true,
              content: data,
            });
          }
    })
    console.log(members)
    
  } catch {
    console.log(err);
    return res.status(401).send({ success: false, message: "Server Error" });
  }
});

module.exports = router;
