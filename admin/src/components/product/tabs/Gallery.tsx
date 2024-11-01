import {List, ResourceContextProvider, WithRecord, useEditContext, BooleanField, Datagrid} from 'react-admin';
import { DrawerButton, Types } from '../../../utils/drawer/ DrawerButton';
import { ImageField } from '../../../utils/imageField';
import Create from './gallery/Create';
import Edit from './gallery/Edit';

export const Gallery = () => {
  const {record, isLoading} = useEditContext();
  return (
    <ResourceContextProvider value="product_images">
      <>
        <DrawerButton type={Types.Create} width="550px">
          <Create/>
        </DrawerButton>
        <List
          actions={false}
          pagination={false}
          title="/"
          filter={{product: record.id}}
          sort={{field: 'position', order: 'ASC'}}
          perPage={100}
        >
          <Datagrid>
            <ImageField/>
            <BooleanField source="defaultImage" />
            <WithRecord label="Edit" render={rowRecord => (
              <DrawerButton type={Types.Edit} width="550px">
                <Edit itemId={rowRecord.id} />
              </DrawerButton>
            )}
            />
          </Datagrid>
        </List>
      </>
    </ResourceContextProvider>

  )
}