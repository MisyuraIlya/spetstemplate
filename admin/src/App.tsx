import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import user from "./components/user";
import category from "./components/category";
import product from "./components/product";
export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    // authProvider={authProvider}
  >
        <Resource name="users" {...user} />
        <Resource name="categories" {...category} />
        <Resource name="products" {...product} />
  </Admin>
);
