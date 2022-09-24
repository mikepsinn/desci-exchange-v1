import { SortOrder } from "../../util/SortOrder";

export type UserOrderByInput = {
  createdAt?: SortOrder;
  ethAddress?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  jwt?: SortOrder;
  lastLoginAt?: SortOrder;
  lastName?: SortOrder;
  password?: SortOrder;
  roles?: SortOrder;
  updatedAt?: SortOrder;
  username?: SortOrder;
};
