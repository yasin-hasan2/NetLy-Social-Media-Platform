import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessages);
router.route("/all/:id").get(isAuthenticated, getMessages);

export default router;
