import {required, ResourceContextProvider, TextInput, useEditContext} from 'react-admin';
import { CreateDrawerWrapper } from '@/utils/drawer/CreateDrawerWrapper';

export default function CreateChild() {
  const { record, isLoading } = useEditContext();
  return(
    <ResourceContextProvider value="categories">
      <CreateDrawerWrapper title="Add Slide" defaultValues={{parent: record.id}}>
        <TextInput source="title" validate={required()} fullWidth={true} />
      </CreateDrawerWrapper>
    </ResourceContextProvider>
  )
}