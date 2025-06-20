// build For chatting with the user

import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessages = async (req, res) => {
  try {
    const senderId = req.id; // ID of the user sending the message
    const receiverId = req.params.id; // ID of the user receiving the message
    const { message } = req.body; // The message content from the request body

    // check if the sender and receiver are the same
    let conversation = await conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // Create a new message object
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content: message,
    });
    // Add the new message to the conversation
    if (newMessage) conversation.messages.push(newMessage._id);
    // await conversation.save();  // Save the conversation with the new message
    // await newMessage.save();  // Save the new message

    // Update the last message in the conversation. same just "promise"  is the short way to do it
    await Promise.all([conversation.save(), newMessage.save()]);

    // implement socket io for real-time messaging
    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      conversationId: conversation._id, // Return the conversation ID
      newMessage, // Return the newly created message
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    console.error("Error in sendMessages:", error);
  }
};

// Get all messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const senderId = req.id; // ID of the user sending the message
    const receiverId = req.params.id; // ID of the user receiving the message
    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    // Check if the conversation exists
    if (!conversation || conversation.length === 0) {
      return res.status(200).json({
        messages: [],
        success: true,
      });
    }

    // Populate the messages in the conversation
    return res.status(200).json({
      messages: conversation?.messages || [],
      success: true,
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
