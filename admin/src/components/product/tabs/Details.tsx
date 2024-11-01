import {AutocompleteInput, NumberInput, ReferenceInput, required, SelectInput} from 'react-admin';

// @ts-ignore
const filterToQuery = searchText => ({ name: `%${searchText}%` })

export default function Details() {
  return(
    <>
      <ReferenceInput label="Brand" source="brand" reference="brands" perPage={100}>
        <AutocompleteInput
          fullWidth={true}
          filterToQuery={filterToQuery}
          optionText="name"
          validate={required()}
        />
      </ReferenceInput>
      <NumberInput source="measure" fullWidth={true} name="measure" />
      <SelectInput source="unit" fullWidth={true} choices={[
        { id: 'ml', name: 'ml' },
        { id: 'l', name: 'l' },
        { id: 'g', name: 'g' },
        { id: 'kg', name: 'kg' }
      ]} />
      <NumberInput source="stock" fullWidth={true} disabled name="stock"/>
    </>
  )
}