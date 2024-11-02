import { List, ResourceContextProvider, useEditContext, TextField, WithRecord, Datagrid } from 'react-admin';
import { DrawerButton,Types } from '../../../utils/drawer/ DrawerButton';
import CreateChild from './CreateChild';
import EditChild from './EditChild';

export default function ChildrenList() {
  const { record, isLoading } = useEditContext();

  if (isLoading || !record) return null;

  return (
    <ResourceContextProvider>
      <>
        <DrawerButton type={Types.Create} width="550px">
          <CreateChild />
        </DrawerButton>
        <List
          resource="categories"
          actions={false}
          pagination={false}
          empty={false}
          title="/"
          filter={{ parent: record.id }}
          sort={{ field: 'position', order: 'ASC' }}
          perPage={100}
        >
          <Datagrid>
            <TextField source="title" />
            <WithRecord label="Edit" render={(rowRecord) => (
              <DrawerButton type={Types.Edit} width="550px">
                <EditChild itemId={rowRecord.id} />
              </DrawerButton>
            )} />
          </Datagrid>
        </List>
      </>
    </ResourceContextProvider>
  );
}
