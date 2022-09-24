import { InputJsonValue } from "../../types";

export type UserUpdateInput = {
  ethAddress?: string | null;
  firstName?: string | null;
  jwt?: string | null;
  lastLoginAt?: string | null;
  lastName?: string | null;
  password?: string;
  roles?: InputJsonValue;
  username?: string;
};
