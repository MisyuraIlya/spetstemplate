import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import user from "./components/user";
import category from "./components/category";
import product from "./components/product";
import brand from "./components/brand";
export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    // authProvider={authProvider}
  >
        <Resource name="users" {...user} />
        <Resource name="categories" {...category} />
        <Resource name="brands"  {...brand} />
        <Resource name="products" {...product} />
  </Admin>
);
