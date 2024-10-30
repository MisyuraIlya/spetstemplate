import {Edit, FormTab, required, TabbedForm, TextInput} from "react-admin";
import ChildrenList from "./children/ChildrenList";

export default () => (
  <Edit>
    <TabbedForm>
      <FormTab
        label="General"
      >
        <TextInput source="title" validate={required()} fullWidth={true} />
      </FormTab>
      <FormTab
        label="Children"
        path="children"
        width={'100%'}
      >
        <ChildrenList />
      </FormTab>
    </TabbedForm>
  </Edit>
)
