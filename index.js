const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://infoziant.com','https://infoziant-admin-frontend.vercel.app','https://infoziant-coral.vercel.app'], // ✅ Your frontend URL (adjust if using another port)
  credentials: true               // ✅ Needed to allow cookies
}));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
