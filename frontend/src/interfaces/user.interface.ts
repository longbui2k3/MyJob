import { UserTypeValues } from "../helpers/constants";

export default interface User {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  userType: UserTypeValues;
  hasCompany?: boolean;
}
