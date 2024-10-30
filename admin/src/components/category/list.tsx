import {List, TextField, EditButton, Datagrid} from "react-admin";

export default () => (
  <List
    filter={{'exists[parent]': false}}
    sort={{field: 'position', order: 'ASC'}}
  >
    <Datagrid>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
)
