const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("./middleware/cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);
// app.use(express.urlencoded({ extended: false }));

app.use("/auth", require("./routes/authRouter"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
app.get("/", (req, res) => res.send("Server running"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
