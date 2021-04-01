require("./db/models/User");
require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(morgan(":method :url :response-time"));
app.use(authRoutes);
const { auth } = require("./middlewares/auth");
app.use("/private", auth );

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
