import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import dataProvider from "../providers/dataProvider";
import authProvider from "@/providers/authProvider";
import user from "./user";
const AdminApp = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users"  {...user}/>
  </Admin>
);

export default AdminApp;