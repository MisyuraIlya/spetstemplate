import {List, TextField, EditButton, Datagrid} from "react-admin";

export default () => (
  <List
    sort={{field: 'position', order: 'ASC'}}
  >
    <Datagrid>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
)
