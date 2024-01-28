// const axios = require('axios');
const express = require("express");
const app = express();
const port = 3000;
const mongoDB = require("./db");
mongoDB();
app.use(express.json());
app.use("/v1", require("./routes/user/userCreate"));
app.use("/v1", require("./routes/community/communityCreate"));
app.use("/v1", require("./routes/role/roleCreate"));
app.use("/v1", require("./routes/member/memberCreate"));
app.use("/v1", require("./routes/member/allmembers"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
