require("dotenv").config();


const app = require("./app");
require("./cron/riskEngine");

const connectDB = require("./config/db");


connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});




