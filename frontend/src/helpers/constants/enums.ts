export enum UserTypes {
  EMPLOYEE = "employee",
  EMPLOYER = "employer",
  ADMIN = "admin",
}

export type UserTypeKeys = keyof typeof UserTypes;

export type UserTypeValues = (typeof UserTypes)[UserTypeKeys];

export enum UserStatuses {
  UNVERIFIED = "unverified",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum ViewTypes {
  GRID = "grid",
  ROWS_FILL = "rows_fill",
}

export enum HttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export type HttpMethodsKeys = keyof typeof HttpMethods;

export type HttpMethodsValues = (typeof HttpMethods)[HttpMethodsKeys];
