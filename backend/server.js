const app = require("./app");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

 const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
    //  console.log(`Server is running on port ${PORT}`);
// }
module.exports = app;
