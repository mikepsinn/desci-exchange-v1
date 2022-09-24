import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  PasswordInput,
  SelectArrayInput,
} from "react-admin";

import { ROLES_OPTIONS } from "../user/RolesOptions";

export const UserCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="ETH Address" source="ethAddress" />
        <TextInput label="First Name" source="firstName" />
        <TextInput label="JWT" source="jwt" />
        <TextInput label="Last Login At" source="lastLoginAt" />
        <TextInput label="Last Name" source="lastName" />
        <PasswordInput label="Password" source="password" />
        <SelectArrayInput
          source="roles.roles"
          choices={ROLES_OPTIONS}
          optionText="label"
          optionValue="value"
        />
        <TextInput label="Username" source="username" />
      </SimpleForm>
    </Create>
  );
};
