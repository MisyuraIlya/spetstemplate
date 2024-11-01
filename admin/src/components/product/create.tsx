import {Create, SimpleForm} from "react-admin";
import General from "./tabs/General";

// @ts-ignore
const filterToQuery = searchText => ({ name: `%${searchText}%` })

export default () => (
  <Create redirect="edit">
    <SimpleForm>
      <General />
    </SimpleForm>
  </Create>
)
