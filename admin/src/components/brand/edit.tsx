import {Edit, required, SimpleForm, TextInput} from "react-admin";

export default () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth={true} />
    </SimpleForm>
  </Edit>
)
