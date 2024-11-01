import {BooleanInput, ResourceContextProvider, useEditContext} from 'react-admin';
import {Editable} from './Editable';
import { EditDrawerWrapper } from '../../../../utils/drawer/ EditDrawerWrapper';

// @ts-ignore
const Edit = ({itemId}) => {
  const { record, isLoading } = useEditContext();
  return (
    <ResourceContextProvider value="product_images">
      <EditDrawerWrapper title="Add Image" defaultValues={{product: record.id}} itemId={itemId} resource={'product_images'}>
        <Editable dirName="products" />
        <DefaultImage />
      </EditDrawerWrapper>
    </ResourceContextProvider>
  )
}
export default Edit

const DefaultImage = () => {
  const { record, isLoading } = useEditContext();

  if (isLoading || record.defaultImage) return null

  return(
    <BooleanInput source="defaultImage" />
  )
}