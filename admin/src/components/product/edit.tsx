import {Edit, FormTab, TabbedForm} from "react-admin";
import General from "./tabs/General";
import Details from "./tabs/Details";
import { Gallery } from "./tabs/Gallery";
import Chart from "./tabs/Chart";

export default () => (
  <Edit>
    <TabbedForm>
      <FormTab
        label="General"
      >
        <General />
      </FormTab>
      {/* <FormTab
        label="Details"
        path="details"
        width={400}
      >
        <Details />
      </FormTab>
      <FormTab
        label="Images"
        path="images"
      >
        <Gallery />
      </FormTab>
      <FormTab
        label="Sale Chart"
        path="chart"
      >
        <Chart />
      </FormTab> */}
    </TabbedForm>
  </Edit>
)
