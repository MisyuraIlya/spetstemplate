import {AutocompleteInput, ReferenceInput, required, TextInput, BooleanInput, SelectInput} from 'react-admin';
import {useWatch} from 'react-hook-form';

// @ts-ignore
const filterToQuery = searchText => ({ name: `%${searchText}%` })

export default function General() {
  return(
    <>
      <TextInput source="title" validate={required()} fullWidth={true} />
      <ReferenceInput label="Category" source="category" reference="categories"  perPage={100}>
        <AutocompleteInput
          fullWidth={true}
          filterToQuery={filterToQuery}
          optionText="title"
          validate={required()}
        />
      </ReferenceInput>
      <ReferenceInput label="Brand" source="brand" reference="brands" perPage={100}>
        <AutocompleteInput
          fullWidth={true}
          filterToQuery={filterToQuery}
          optionText="title"
        />
      </ReferenceInput>
      <SelectChildCategory />
      <TextInput source="sku" validate={required()} fullWidth={true} />
      <BooleanInput source="isPublished" name='isPublished' />
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