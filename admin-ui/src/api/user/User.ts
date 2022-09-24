import { JsonValue } from "type-fest";

export type User = {
  createdAt: Date;
  ethAddress: string | null;
  firstName: string | null;
  id: string;
  jwt: string | null;
  lastLoginAt: string | null;
  lastName: string | null;
  roles: JsonValue;
  updatedAt: Date;
  username: string;
};
