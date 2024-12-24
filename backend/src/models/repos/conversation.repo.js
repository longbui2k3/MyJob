const conversationModel = require("../conversation.model");
const BaseRepo = require("./base.repo");

class ConversationRepo extends BaseRepo {
  constructor() {
    super(conversationModel);
  }

  async findByIdAndUser(id, userId) {
    return await this.findOne({
      _id: id,
      participants: { $in: [userId] },
    });
  }

  async createConversation(participantIds) {
    return await this.create({
      participants: participantIds,
    });
  }

  async addMessageToConversation(conversationId, messageId) {
    return await this.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: {
          messages: messageId,
        },
      },
      {},
      true
    );
  }

  async getConversation(conversationId) {
    const conversation = await this.findById(conversationId, {
      populates: ["participants", "participants.profile"],
      populateSelects: ["_id username profile latestOnlineAt", "name avatar"],
    });
    return conversation;
  }

  async getAllConversations(userId) {
    return await this.find(
      {
        participants: { $in: [userId] },
      },
      {
        populates: ["participants", "participants.profile"],
        populateSelects: ["_id username profile latestOnlineAt", "name avatar"],
      }
    );
  }

  async deleteConversation(conversationId) {
    await this.deleteOne({ _id: conversationId });
  }
}

module.exports = new ConversationRepo();
