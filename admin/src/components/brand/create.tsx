import {Create, required, SimpleForm, TextInput} from "react-admin";

export default () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth={true} />
    </SimpleForm>
  </Create>
)
