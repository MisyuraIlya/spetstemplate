import {Create, RaRecord, SimpleForm, useNotify, useRedirect, useRefresh} from "react-admin";
import Toolbar from "./toolBar";
import { useCreateDrawer } from "./ DrawerButton";

type Props = {
  title: string,
  children: JSX.Element,
  defaultValues?: {[key: string]: any}
}
export const CreateDrawerWrapper = ({title, defaultValues={}, children}: Props) => {

  const {_close} = useCreateDrawer()
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess = (data: RaRecord) => {
    notify(`Changes saved`);
    redirect(false);
    refresh();
    _close()
  };

  return (
    <Create title={title} mutationOptions={{onSuccess}}>
      <SimpleForm defaultValues={defaultValues} toolbar={<Toolbar />}>
        {children}
      </SimpleForm>
    </Create>
  )
}