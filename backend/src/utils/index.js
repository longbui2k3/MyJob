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
const changePopulateStringToObject = (
  populateString,
  selects = {},
  matches = {}
) => {
  // populateString: string  ex:user.job.abc.def

  const keys = populateString.split(".");
  function recursion(i) {
    if (i === keys.length - 1) {
      return removeUndefinedInObject({
        path: keys[i],
        match: matches[keys[i]] || undefined,
        select: selects[keys[i]] || undefined,
      });
    }
    const object = removeUndefinedInObject({
      path: keys[i],
      populate: recursion(i + 1),
      match: matches[keys[i]] || undefined,
      select: selects[keys[i]] || undefined,
    });
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

const flattenQueryArray = (query) => {
  if (!query) return [];
  if (!Array.isArray(query)) query = [query];
  return query;
};

const changeDateToString = (date) => {
  const now = new Date(Date.now());
  const timeStr = date
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  const dateStr = date.toDateString().split(" ").slice(1).join(" ");
  const dayStr = date.toDateString().split(" ")[0];
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    return timeStr;
  }
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    if (now.getDate() - date.getDate() <= 6 && now.getDate() > date.getDate()) {
      return `${dayStr}, ${timeStr}`;
    }
  }
  return dateStr + ", " + timeStr;
};

const messagesWithDays = (messages) => {
  let messagesWithDays = [];
  if (messages.length === 0) {
    return [];
  }
  let date = new Date(messages[0].createdAt);
  let messes = [messages[0]];
  for (let i = 1; i < messages.length; i++) {
    if (i === messages.length - 1) {
      if (new Date(messages[i].createdAt).getHours() === date.getHours()) {
        messes.push(messages[i]);
        messagesWithDays.push({
          date: changeDateToString(date),
          fullDate: date,
          messages: messes,
        });
      } else {
        messagesWithDays.push({
          date: changeDateToString(date),
          fullDate: date,
          messages: messes,
        });
        messagesWithDays.push({
          date: changeDateToString(new Date(messages[i].createdAt)),
          fullDate: new Date(messages[i].createdAt),
          messages: [messages[i]],
        });
      }
      break;
    }
    if (new Date(messages[i].createdAt).getHours() === date.getHours()) {
      messes.push(messages[i]);
    } else {
      messagesWithDays.push({
        date: changeDateToString(date),
        fullDate: date,
        messages: messes,
      });
      date = new Date(messages[i].createdAt);
      messes = [messages[i]];
    }
  }

  return messagesWithDays;
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
  flattenQueryArray,
  messagesWithDays,
  changeDateToString,
};
