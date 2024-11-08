const multer = require("multer");
const { BadRequestError } = require("../core/error.response");
const uploadMulter = (uploadFiles = []) => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, callback) {
      uploadFiles.forEach((uploadFile) => {
        if (file.fieldname === uploadFile.fieldname) {
          if (uploadFile.allowedTypes.includes(file.mimetype)) {
            callback(null, true);
          } else {
            const extensionsStr = uploadFile.allowedTypes
              .map((type) => "." + type.split("/")[1])
              .join(", ");
            callback(
              new BadRequestError(`Only ${extensionsStr} files are allowed.`),
              false
            );
          }
        }
      });
    },
  });
};

module.exports = {
  uploadMulter,
};
