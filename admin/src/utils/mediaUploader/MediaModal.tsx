import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {MediaList} from "./MediaList";
import {Uploader} from "./Uploader";
import {useMedia} from "./store/MediaContext";

export const MediaModal = () => {
	const {source, open, openModal, closeModal} = useMedia()
	return(
		<>
			<Button onClick={openModal} startIcon={<ImageIcon />} variant="outlined">Select Media</Button>
			<Dialog open={open} onClose={closeModal}>
				<DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<span>Media Manager</span>
					<Uploader />
				</DialogTitle>
				<DialogContent>
					<MediaList />
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}