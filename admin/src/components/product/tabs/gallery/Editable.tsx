import {TextInput} from "react-admin";
import { MediaZone } from "../../../../utils/mediaUploader/MediaZone";
import { MediaProvider } from "../../../../utils/mediaUploader/store/MediaContext";

// @ts-ignore
export const Editable = ({dirName}) => (
    <MediaProvider source={dirName}>
      <MediaZone width={400} height={200} />
    </MediaProvider>
)