const _ = require("lodash");
const { Types } = require("mongoose");
const crypto = require("crypto");

const getInfoData = ({ object = {}, fields = [] }) => {
  return _.pick(object, fields);
};
/*
  ['type', 1],
  ['col', 2]
  => {
    type: 1,
    col: 2
  }
*/
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((e) => [e, 1]));
};
const getUnselectData = (select = []) => {
  return Object.fromEntries(select.map((e) => [e, 0]));
};
const removeUndefinedInObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};
const changePopulateStringToObject = (populateString) => {
  // populateString: string  ex:user.job.abc.def
  const keys = populateString.split(".");
  function recursion(i) {
    if (i === keys.length - 1) {
      return {
        path: keys[i],
      };
    }
    const object = {
      path: keys[i],
      populate: recursion(i + 1),
    };
    return object;
  }
  return recursion(0);
};
const convertToObjectId = (id) => new Types.ObjectId(id);

const hashString = (str) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

const createTokenString = (size) => {
  return crypto.randomBytes(size).toString("hex");
};
module.exports = {
  getInfoData,
  getSelectData,
  getUnselectData,
  convertToObjectId,
  removeUndefinedInObject,
  changePopulateStringToObject,
  hashString,
  createTokenString,
};