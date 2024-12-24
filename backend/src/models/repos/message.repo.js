const messageModel = require("../message.model");
const BaseRepo = require("./base.repo");

class MessageRepo extends BaseRepo {
  constructor() {
    super(messageModel);
  }

  async findByConversation(conversation, page) {
    if (!page) {
      return await this.find({ conversation });
    }
    const perPage = 20;
    return await this.find(
      { conversation },
      {
        populates: ["replyMessage"],
        sort: ["-createdAt"],
        limit: perPage,
        page,
      }
    );
  }
  async createMessage({
    senderId,
    message,
    image,
    replyMessage,
    react,
    conversation,
  }) {
    return await this.create({
      senderId,
      message,
      image,
      replyMessage,
      react,
      conversation,
    });
  }

  async deleteMessagesByConversation(conversationId) {
    await this.deleteMany({ conversation: conversationId });
  }

  async deleteMessage(messageId) {
    await this.deleteOne({ _id: messageId });
  }
}

module.exports = new MessageRepo();
