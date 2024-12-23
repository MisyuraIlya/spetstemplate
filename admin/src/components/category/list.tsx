import {List, TextField, EditButton, Datagrid} from "react-admin";

export default () => (
  <List
  filter={{ 'parentExists': true }}
  >
    <Datagrid>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
)
