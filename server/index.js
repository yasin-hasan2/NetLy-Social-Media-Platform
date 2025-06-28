import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // Import the database connection function
import userRoute from "./routes/user.route.js"; // Import user routes
// This is the main entry point for the server application.
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

import { app, server } from "./socket/socket.js";

dotenv.config({}); // Load environment variables from .env file

// const app = express(); //
const PORT = process.env.PORT || 5000; // Default port if not specified in .env
// Import database connection

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the server",
    status: "success",
  });
});

/// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Import routes

const corsOptions = {
  origin: ["https://netly-social-media-platform.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

// Import all routes
app.use("/api/v1/user", userRoute);
// ("https://netly-social-media-platform-g76x.vercel.app/api/v1/user/register"); // Example endpoint for user registration
// This sets up the user-related routes under the /api/v1/user path
// The userRoute handles user registration, login, profile editing, etc.
//  Start the server and connect to the database
//  Listen on the specified port and log a message when the server is running
app.use("/api/v1/post", postRoute); // Import post routes
app.use("/api/v1/message", messageRoute); // Import message routes

server.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`🚀 Server is running on port ${PORT}`);
});
