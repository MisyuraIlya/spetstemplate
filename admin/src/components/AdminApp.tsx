import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import dataProvider from "../providers/dataProvider";
import authProvider from "@/providers/authProvider";
import user from "./user";
import category from "./category";
const AdminApp = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users"  {...user}/>
    <Resource name="categories"  {...category}/>
  </Admin>
);

export default AdminApp;