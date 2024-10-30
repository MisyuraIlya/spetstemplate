import {Drawer} from "@mui/material";
import {Identifier} from "react-admin";
type Props = {
	open: boolean,
	id?: Identifier,
	close: () => void,
	width?: string,
	children: JSX.Element
}
export const DrawerTool = ({open, id, width = '300px', close, children}: Props) => {
	return (
		<Drawer
			open={open}
			anchor="right"
			onClose={close}
			PaperProps={{
				sx: {
					width: width
				}
			}}
		>
			{children}
		</Drawer>
	)
}