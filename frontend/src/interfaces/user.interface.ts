import { UserTypeValues } from "../helpers/constants";

export default interface User {
  _id: string;
  name: string;
  avatar: string;
  userType: UserTypeValues;
  hasCompany?: boolean;
}
