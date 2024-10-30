import {Create, SimpleForm} from "react-admin";
import Editable from "./Editable";

export default () => (
  <Create redirect="list">
    <SimpleForm>
      <Editable />
    </SimpleForm>
  </Create>
)
