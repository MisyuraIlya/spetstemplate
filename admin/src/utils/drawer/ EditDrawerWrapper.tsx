import {Edit, SimpleForm, Identifier, useNotify, useRedirect, useRefresh, useUpdate} from "react-admin";
import Toolbar from "./toolBar";
import { useCreateDrawer } from "./ DrawerButton";

type Props = {
  resource: string,
  itemId: Identifier,
  title: string,
  children: JSX.Element | JSX.Element[],
  defaultValues?: {[key: string]: any}
}
export const EditDrawerWrapper = ({resource, itemId, title, defaultValues={}, children}: Props) => {

  const {_close} = useCreateDrawer()
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const [update, {isLoading: isSubmitting}] = useUpdate();

  const onSubmit = (data:Object) => {
    update(
      resource,
      {id: itemId, data},
      {
        onSuccess: () => {
          notify(`Changes saved`);
          redirect(false);
          refresh();
          _close();
        }
      }
    );
  }

  return (
    <Edit id={itemId} title={title}>
      <SimpleForm defaultValues={defaultValues} onSubmit={onSubmit} toolbar={<Toolbar />}>
        {children}
      </SimpleForm>
    </Edit>
  )
}