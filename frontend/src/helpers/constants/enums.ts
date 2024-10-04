export enum UserTypes {
  EMPLOYEE = "employee",
  EMPLOYER = "employer",
}

export type UserTypeKeys = keyof typeof UserTypes;

export type UserTypeValues = (typeof UserTypes)[UserTypeKeys];
