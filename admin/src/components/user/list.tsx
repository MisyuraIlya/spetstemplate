import React from 'react';

import {List, TextField, EditButton, FilterLiveSearch, Datagrid} from "react-admin";
import {Card, CardContent} from '@mui/material';

export default () => (
  <List
    // sort={{field: 'position', order: 'ASC'}}
    // aside={<ClientSearch />}
  >
    <Datagrid>
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="password" />
        <EditButton />
    </Datagrid>
  </List>
)

const ClientSearch = () => {
    console.log('adss')
  return(
    <Card sx={{ order: -1, mr: 2, mt: 6, width: 300 }}>
      <CardContent>
        <FilterLiveSearch source="mobile" label="Search" />
      </CardContent>
    </Card>
  )
}
