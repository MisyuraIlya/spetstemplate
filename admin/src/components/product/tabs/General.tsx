import {AutocompleteInput, ReferenceInput, required, TextInput, BooleanInput, SelectInput} from 'react-admin';
import {useWatch} from 'react-hook-form';

// @ts-ignore
const filterToQuery = searchText => ({ name: `%${searchText}%` })

export default function General() {
  return(
    <>
      <TextInput source="title" validate={required()} fullWidth={true} />
      <ReferenceInput label="Category" source="category" reference="categories" filter={{'exists[parent]': false}} perPage={100}>
        <AutocompleteInput
          fullWidth={true}
          filterToQuery={filterToQuery}
          optionText="name"
          validate={required()}
        />
      </ReferenceInput>
      <SelectChildCategory />
      <TextInput source="sku" validate={required()} fullWidth={true} />
      <TextInput source="barcode" validate={required()} fullWidth={true} />
      <BooleanInput source="hidden" />
    </>
  )
}

export const SelectChildCategory = () => {
  const category = useWatch({name: 'category'});
  if (!category) return null;
  return (
    <ReferenceInput source="childCategory" reference="categories" filter={{parent: category}}>
      <SelectInput fullWidth={true} optionText="title" />
    </ReferenceInput>
  )
}