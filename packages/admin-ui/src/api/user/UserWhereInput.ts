import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type UserWhereInput = {
  ethAddress?: StringNullableFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  jwt?: StringNullableFilter;
  lastLoginAt?: StringNullableFilter;
  lastName?: StringNullableFilter;
  username?: StringFilter;
};
