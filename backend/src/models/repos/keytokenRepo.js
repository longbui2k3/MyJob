const { convertToObjectId } = require("../../utils");
const keytokenModel = require("../keytoken.model");
const BaseRepo = require("./baseRepo");

class KeyTokenRepo extends BaseRepo {
  constructor() {
    super(keytokenModel);
  }

  async findByUserId(userId) {
    return await this.findOne({
      user: convertToObjectId(userId),
    });
  }

  async removeKeyById(id) {
    return await this.deleteOne({ _id: convertToObjectId(id) });
  }
}

module.exports = new KeyTokenRepo();
