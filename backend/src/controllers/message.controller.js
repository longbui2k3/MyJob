const { CREATED, OK } = require("../core/success.response");
const MessageService = require("../services/message.service");

class MessageController {
  sendMessage = async (req, res, next) => {
    const result = await MessageService.sendMessage({
      userId: req.user.userId,
      conversationId: req.body.conversation,
      message: req.body.message,
      file: req.file,
      replyMessageId: req.body.replyMessage,
      react: req.body.react,
    });

    return new CREATED({
      message: "Send message successfully!",
      metadata: result,
    }).send(res);
  };

  findByConversation = async (req, res, next) => {
    const result = await MessageService.findByConversation(
      req.user.userId,
      req.query.conversation,
      parseInt(req.query.page)
    );

    return new OK({
      message: "Find messages by conversation successfully!",
      metadata: {
        messages: result,
      },
    }).send(res);
  };

  deleteMessage = async (req, res, next) => {
    await MessageService.deleteMessage(req.params.messageId);
    new OK({
      message: "Delete message successfully!",
    }).send(res);
  };
}

module.exports = new MessageController();
