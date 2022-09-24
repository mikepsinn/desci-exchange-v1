import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  PasswordInput,
  SelectArrayInput,
} from "react-admin";
import { ROLES_OPTIONS } from "../user/RolesOptions";

export const UserEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
