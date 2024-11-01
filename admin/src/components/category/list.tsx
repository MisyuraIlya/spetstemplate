import {List, TextField, EditButton, Datagrid} from "react-admin";

export default () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
)
