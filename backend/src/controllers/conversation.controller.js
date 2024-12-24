const { OK } = require("../core/success.response");
const ConversationService = require("../services/conversation.service");

class ConversationController {
  createConversation = async (req, res, next) => {
    const result = await ConversationService.createConversation(
      req.user.userId,
      req.body.participants
    );

    return new OK({
      message: "Create conversation successfully!",
      metadata: result,
    }).send(res);
  };

  getConversation = async (req, res, next) => {
    const result = await ConversationService.getConversation(
      req.user.userId,
      req.params.conversation
    );

    return new OK({
      message: "Get conversation successfully!",
      metadata: result,
    }).send(res);
  };

  getAllConversations = async (req, res, next) => {
    const result = await ConversationService.getAllConversations(
      req.user.userId
    );

    return new OK({
      message: "Get all conversations successfully!",
      metadata: {
        conversations: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  deleteConversation = async (req, res, next) => {
    await ConversationService.deleteConversation(
      req.user.userId,
      req.params.conversation
    );

    return new OK({
      message: "Delete conversation successfully!",
    }).send(res);
  };
}

module.exports = new ConversationController();
