import {ResourceContextProvider, useEditContext} from 'react-admin';
import {Editable} from './Editable';
import { CreateDrawerWrapper } from '../../../../utils/drawer/CreateDrawerWrapper';

const Create = () => {
  const { record, isLoading } = useEditContext();
  return (
    <ResourceContextProvider value="product_images">
      <CreateDrawerWrapper title="Add Image" defaultValues={{product: record.id}}>
        <Editable dirName="products" />
      </CreateDrawerWrapper>
    </ResourceContextProvider>
  )
}
export default Create