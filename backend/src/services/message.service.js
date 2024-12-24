const { BadRequestError } = require("../core/error.response");
const conversationRepo = require("../models/repos/conversation.repo");
const messageRepo = require("../models/repos/message.repo");
const userRepo = require("../models/repos/user.repo");
const { messagesWithDays } = require("../utils");
const resizeImage = require("../utils/resizeImage");
const SocketConnection = require("../utils/socket");
const UploadFiles = require("../utils/uploadFiles");

class MessageService {
  static async sendMessage({
    userId,
    conversationId,
    message,
    file,
    replyMessageId,
    react,
  }) {
    if ((message === "" || !message) && !file) {
      throw new BadRequestError("Message and image must not be empty!");
    }
    if (message !== "" && message && file) {
      throw new BadRequestError(
        "Message and image can not be created at the same time!"
      );
    }

    let user = null;
    let conversation = null;
    let replyMessage = null;
    if (replyMessageId) {
      [user, conversation, replyMessage] = await Promise.all([
        userRepo.findById(userId),
        conversationRepo.findByIdAndUser(conversationId, userId),
        messageRepo.findById(replyMessageId),
      ]);

      if (!replyMessage) {
        throw new BadRequestError("Reply message not found!");
      }
    } else {
      [user, conversation] = await Promise.all([
        userRepo.findById(userId),
        conversationRepo.findByIdAndUser(conversationId, userId),
      ]);
    }

    if (!user) {
      throw new BadRequestError("User not found!");
    }

    if (!conversation) {
      throw new BadRequestError("Conversation not found!");
    }

    let image = undefined;
    if (file) {
      file.buffer = await resizeImage(file.buffer);
      image = await new UploadFiles(
        "messages",
        "images",
        file
      ).uploadFileAndDownloadURL();
    }
    const newMessage = await messageRepo.createMessage({
      senderId: userId,
      message: message,
      image,
      replyMessage: replyMessage?._id,
      react: react,
      conversation: conversation._id,
    });
    const receivedIds = conversation.participants.filter(
      (id) => id.toString() !== userId.toString()
    );
    // Socket io
    if (receivedIds.length !== 0) {
      for (let i = 0; i < receivedIds.length; i++) {
        const receiverSocketId = SocketConnection.getReceiverSocketId(
          receivedIds[i].toString()
        );
        if (receiverSocketId && newMessage) {
          if (replyMessage) newMessage.replyMessage = replyMessage;
          SocketConnection.io
            .to(receiverSocketId)
            .emit("newMessage", newMessage);
        }
      }
    }

    return {
      message: newMessage,
    };
  }

  static async findByConversation(userId, conversationId, page) {
    const conversation = await conversationRepo.findByIdAndUser(
      conversationId,
      userId
    );

    if (!conversation) {
      throw new BadRequestError("Conversation not found!");
    }
    const messages = messagesWithDays(
      (await messageRepo.findByConversation(conversation._id, page)).data
    );
    return messages;
  }

  static async deleteMessage(messageId) {
    const message = await messageRepo.findById(messageId);
    if (!message) {
      throw new BadRequestError("Message not found!");
    }
    await messageRepo.deleteMessage(message._id);
  }
}

module.exports = MessageService;
