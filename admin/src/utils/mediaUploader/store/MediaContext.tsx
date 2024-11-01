import {createContext, useReducer, useContext} from "react";
import mediaReducer, {AppContextInterface, initialContext, initialState} from "./mediaReducer";
import {RaRecord} from "react-admin";

const MediaContext = createContext<AppContextInterface>(initialContext);

type Props = {
  children: JSX.Element,
  source: string
}
export const MediaProvider = ({ children, source }: Props) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);
  const openModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        open: true
      }
    });
  }
  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: {
        open: false
      }
    });
  }
  const setMedia = (record: RaRecord | null) => {
    dispatch({
      type: "SET_MEDIA",
      payload: {
        media: record
      }
    });
  }

  const value: AppContextInterface = {
    source: source,
    open: state.open,
    media: state.media,
    openModal,
    closeModal,
    setMedia,
  };
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMedia = () => {
  const context = useContext(MediaContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};