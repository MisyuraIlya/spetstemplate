import {Identifier, RaRecord} from "react-admin";

export interface AppStateInterface {
	open: boolean,
}
export interface AppContextInterface extends AppStateInterface {
	_open: () => void,
	_close: () => void
}
export const initialState: AppStateInterface = {
	open: false,
};
export const initialContext: AppContextInterface = {
	...initialState,
	_open: () => {},
	_close: () => {}
};

// @ts-ignore
const drawerReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "OPEN_DRAWER":
			console.log("OPEN_DRAWER", payload);

			return {
				...state,
				open: payload.open
			};
		case "CLOSE_DRAWER":
			console.log("CLOSE_DRAWER", payload);

			return {
				...state,
				open: payload.open
			};
		default:
			throw new Error(`No case for type ${type} found in shopReducer.`);
	}
};

export default drawerReducer;