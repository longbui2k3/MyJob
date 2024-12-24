const conversationRepo = require("../models/repos/conversation.repo");
const messageRepo = require("../models/repos/message.repo");
const userRepo = require("../models/repos/user.repo");
const { messagesWithDays } = require("../utils");

class ConversationService {
  static async createConversation(userId, participantIds) {
    if (participantIds.length === 0) {
      throw new BadRequestError("Please add at least 1 participants!");
    }
    if (!participantIds.includes(userId)) {
      participantIds = [userId, ...participantIds];
    }
    const participantObjectIds = await Promise.all(
      participantIds.map(async (id) => {
        const user = await userRepo.findById(id);
        if (!user) {
          throw new BadRequestError(`User with ${id} not found!`);
        }
        return user._id;
      })
    );
    let conversation = await conversationRepo.createConversation(
      participantObjectIds
    );
    conversation = await conversationRepo.getConversation(conversation.id);
    conversation.participants = conversation.participants.filter(
      (participant) => participant._id.toString() !== userId.toString()
    );
    return { conversation };
  }

  static async getConversation(userId, conversationId) {
    const conversation = await conversationRepo.findByIdAndUser(
      conversationId,
      userId
    );

    if (!conversation) {
      throw new BadRequestError("Conversation not found!");
    }
    const [selectedConversation, messages] = await Promise.all([
      conversationRepo.getConversation(conversation._id),
      messageRepo.findByConversation(conversation._id, 1),
    ]);
    if (selectedConversation)
      selectedConversation.messages = messagesWithDays(messages.data);

    return {
      conversation: selectedConversation,
    };
  }

  static async getAllConversations(userId) {
    let conversations = await conversationRepo.getAllConversations(userId);
    if (conversations.data.length !== 0)
      conversations.data = conversations.data.map((conversation) => {
        conversation.participants = conversation.participants.filter(
          (participant) => participant._id.toString() !== userId.toString()
        );
        return conversation;
      });
    return conversations;
  }

  static async deleteConversation(userId, conversationId) {
    const conversation = await conversationRepo.findByIdAndUser(
      conversationId,
      userId
    );

    if (!conversation) {
      throw new BadRequestError("Conversation not found");
    }
    await messageRepo.deleteMessagesByConversation(conversation._id);
    await conversationRepo.deleteConversation(conversation._id);
  }
}

module.exports = ConversationService;
