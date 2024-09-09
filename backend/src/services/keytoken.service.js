const keytokenRepo = require("../models/repos/keytokenRepo");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const tokens = await keytokenRepo.findOneAndUpdate(
        filter,
        update,
        {},
        true
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
  static findByUserId = async (userId) => {
    return await keytokenRepo.findByUserId(userId);
  };
  static removeKeyById = async (id) => {
    return await keytokenRepo.removeKeyById(id);
  };
}

module.exports = KeyTokenService;
