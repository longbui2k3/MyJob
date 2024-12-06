export function getCookie(cname: string) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkIsValidEmail(email: string) {
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return emailRegex.test(email);
}

export function changeQueryObjToQueryStr(queryObj: { [key: string]: any }) {
  queryObj = removeUndefinedInObject(queryObj);
  return Object.keys(queryObj)
    .map((key) => {
      if (Array.isArray(queryObj[key])) {
        if (queryObj[key].length === 1) {
          return `${key}=${queryObj[key][0]}`;
        }
        return queryObj[key].map((value) => `${key}=${value}`).join("&");
      }
      return `${key}=${queryObj[key]}`;
    })
    .join("&");
}

export function distanceBetweenTwoDates(date1: Date, date2: Date): string {
  if (date1 < date2) {
    return "0 Days";
  }
  const seconds = Math.abs(date1.getTime() - date2.getTime()) / 1000;
  if (seconds > 86400) {
    return Math.floor(seconds / 86400) + " Days";
  } else if (seconds > 3600) {
    return Math.floor(seconds / 3600) + " Hours";
  } else if (seconds > 60) {
    return Math.floor(seconds / 60) + " Minutes";
  }
  return Math.floor(seconds) + " Seconds";
}

export const removeUndefinedInObject = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export const changeDateToString = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toDateString().split(" ").slice(1).join(" ")}`;
};

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + units[i];
}

export { StatusCodes } from "./statusCodes";

export const pxToMm = (px: number) => {
  const myMm = document.getElementById("myMm");
  if (!myMm) return 0;
  return px / myMm.offsetHeight;
};

export const mmToPx = (mm: number) => {
  const myMm = document.getElementById("myMm");
  if (!myMm) return 0;
  return myMm.offsetHeight * mm;
};

export const range = (start: number, end: number) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map(function (val, id) {
      return id + start;
    });
};
