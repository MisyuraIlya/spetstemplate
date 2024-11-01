import {RaRecord, useDelete, useGetList, useRefresh} from "react-admin";
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import {Delete, CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';
import {useFormContext} from "react-hook-form";
import {useMedia} from "./store/MediaContext";

const selectButtonStyle = {
	position: 'absolute',
	padding: '8px',
	background: 'rgba(255, 255, 255, 0.2)',
	cursor: 'pointer',
	fontSize: '42px'
}
export const MediaList = () => {
	const {source, closeModal, setMedia} = useMedia()
	const methods = useFormContext()
	const refresh = useRefresh()

	const { data, total, isLoading, error } = useGetList(
		'media_objects',
		{ sort: {field: 'createdAt', order: 'DESC'}, filter: {source: source}}
	);

	const [deleteOne] = useDelete();

	const removeMedia = (record: RaRecord) => {
		deleteOne(
			'media_objects',
			{ id: record.id , previousData: record },
			{
				onSuccess: (data) => {
					refresh()
				}
			}
		)
	}

	const selectMedia = (record: RaRecord) => {
		methods.setValue('mediaObject', record.id, {
			shouldDirty: true
		})
		setMedia(record)
		closeModal()
	}

	const deSelectMedia = () => {
		methods.setValue('mediaObject', null, {
			shouldDirty: true
		})
		setMedia(null)
		closeModal()
	}

	if (isLoading || !data) return null

	return(
		<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
			{data.map((item) => (
				<ImageListItem key={item.contentUrl}>
					<img
						src={`${item.contentUrl}?w=164&h=164&fit=crop&auto=format`}
						style={{objectFit: "contain"}}
						// srcSet={`${item.contentUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
						loading="lazy"
					/>
					{methods.getValues('media_objects') === item.id ? (
						<CheckBox sx={selectButtonStyle} onClick={deSelectMedia}/>
					) : (
						<CheckBoxOutlineBlank	sx={selectButtonStyle} onClick={() => selectMedia(item)} />
					)}
					<ImageListItemBar
						actionIcon={
							<IconButton
								sx={{ color: 'rgba(255, 255, 255, 0.54)', display: 'flex', justifyContent: 'space-between' }}
								onClick={() => removeMedia(item)}
							>
								<Delete />
							</IconButton>
						}
					>
					</ImageListItemBar>
				</ImageListItem>
			))}
		</ImageList>
	)
}