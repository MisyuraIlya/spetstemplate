import {List, TextField, EditButton, ReferenceField, useRecordContext, BooleanField, NumberField, Datagrid} from "react-admin";
import {Box} from '@mui/material';
import ProductFilter from "./filter/ProductFilter";

const ImageField = () => {
  const record = useRecordContext();
  if (!record) return null
  if (!record?.defaultImage?.filePath) return null
  return (
    <Box sx={{
      width: "100px",
      '& .RaImageField-image': {
        display: "block",
        margin: 0,
        width: "100px",
        height: "40px",
        objectFit: "contain"
      }
    }}>
      <img src={`${record?.defaultImage?.filePath}`} className="RaImageField-image" alt=""/>
    </Box>
  )
}

export default () => (
  <List
    //filter={{'exists[parent]': false}}
    aside={<ProductFilter />}
    sort={{field: 'position', order: 'ASC'}}
  >
    <Datagrid>
      {/* <ImageField /> */}
      <TextField source="title" />
      {/* <TextField source="stock" /> */}
      {/* <TextField source="purchasePrice" label="Price" /> */}
      {/* <TextField source="totalSale" label="Total" /> */}
      <ReferenceField label="category" source="category" reference="categories">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField label="Brand" source="brand" reference="brands">
        <TextField source="title" />
      </ReferenceField>
      {/* <BooleanField source="hidden" /> */}
      <EditButton />
    </Datagrid>
  </List>
)
