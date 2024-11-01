import {RaRecord} from "react-admin";

export interface AppStateInterface {
  open: boolean,
  media: RaRecord | null
}
export interface AppContextInterface extends AppStateInterface {
  source: string,
  openModal: () => void,
  closeModal: () => void,
  setMedia: (record: RaRecord | null) => void
}
export const initialState: AppStateInterface = {
  open: false,
  media: null
};
export const initialContext: AppContextInterface = {
  ...initialState,
  source: '',
  openModal: () => {},
  closeModal: () => {},
  setMedia: () => {}
};

// @ts-ignore
const mediaReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "OPEN_MODAL":
      console.log("OPEN_MODAL", payload);

      return {
        ...state,
        open: payload.open
      };
    case "CLOSE_MODAL":
      console.log("CLOSE_MODAL", payload);

      return {
        ...state,
        open: payload.open
      };
    case "SET_MEDIA":
      console.log("SET_MEDIA", payload);

      return {
        ...state,
        media: payload.media
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};

export default mediaReducer;