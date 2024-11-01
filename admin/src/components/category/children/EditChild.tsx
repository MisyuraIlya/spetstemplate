import {required, ResourceContextProvider, TextInput, useEditContext} from 'react-admin';
import { EditDrawerWrapper } from '../../../utils/drawer/ EditDrawerWrapper';

// @ts-ignore
export default function EditChild({itemId}) {
  const { record, isLoading } = useEditContext();
  return(
    <ResourceContextProvider value="categories">
      <EditDrawerWrapper title="Edit" defaultValues={{parent: record.id}} itemId={itemId} resource={'categories'}>
        <TextInput source="title" validate={required()} fullWidth={true} />
      </EditDrawerWrapper>
    </ResourceContextProvider>
  )
}