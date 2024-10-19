const multer = require("multer");

const uploadMulter = (allowedTypes = [], message = "") => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, callback) {
      if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        throw new BadRequestError(message);
      }
    },
  });
};

module.exports = {
  uploadMulter,
};
