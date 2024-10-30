import {Button} from "@mui/material";
import {Add, Edit} from '@mui/icons-material';
import {DrawerTool} from "./DrawerTool";
import {createContext, useContext, useReducer} from "react";
import createDrawerReducer, {AppContextInterface, initialContext, initialState} from "./draverReducer";

const CreateDrawerContext = createContext<AppContextInterface>(initialContext);

export enum Types {
	Create,
	Edit
}

type Props = {
	children: JSX.Element,
	type: Types.Create | Types.Edit,
	width?: string,
}
export const DrawerButton = ({children, type, width="300px"}: Props) => {

	const [state, dispatch] = useReducer(createDrawerReducer, initialState);

	const _open = (): void => {
		dispatch({
			type: "OPEN_DRAWER",
			payload: {
				open: true
			}
		});
	}

	const _close = (): void => {
		dispatch({
			type: "CLOSE_DRAWER",
			payload: {
				open: false
			}
		});
	}

	const value: AppContextInterface = {
		open: state.open,
		_open,
		_close
	};

	return (
		<CreateDrawerContext.Provider value={value}>
			<>
				{type === Types.Create &&(
					<Button sx={{marginBottom: 2}} onClick={_open} variant="contained" startIcon={<Add />}>Create</Button>
				)}
				{type === Types.Edit &&(
					<Button onClick={_open} variant="text" startIcon={<Edit />}>Edit</Button>
				)}
				<DrawerTool width={width} open={state.open}	close={_close}>
					{children}
				</DrawerTool>
			</>
		</CreateDrawerContext.Provider>
	)
}

export const useCreateDrawer = () => {
	const context = useContext(CreateDrawerContext);

	if (context === undefined) {
		throw new Error("useShop must be used within ShopContext");
	}

	return context;
};