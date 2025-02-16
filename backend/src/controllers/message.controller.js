import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";
import { io, getReceiverSocketId } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;

  try {
    // Fetch users from the database, excluding the logged-in user and omitting passwords
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("Error in getUsersForSidebar:", err); // Add this line
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // Fetch messages between the logged-in user and the specified user
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create a new message object
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // get receiver socket id
    const receiverSocketId = getReceiverSocketId(receiverId);

    // send message to receiver if they are online
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // io.to().emit() is used to send a message to a specific socket
    }

    res.status(200).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
