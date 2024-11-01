import {useMedia} from "./store/MediaContext";
import {Box} from "@mui/material";
import {ImageField, ReferenceField, WithRecord} from "react-admin";
import {MediaModal} from "./MediaModal";

type Props = {
	width?: number,
	height?: number,
}
export const MediaZone = ({width=500, height=300}: Props) => {
	const {media} = useMedia()
	return (
		<>
			{media ? (
				<Box
					sx={{
						display: 'block',
						textAlign: 'center',
						width: '100%',
						'& img': { width: width, height: height, objectFit: 'contain', margin: '0 0 8px 0' }
					}}
				>
					<img src={`${media.contentUrl}`} alt="" />
				</Box>
			) : (
				<ReferenceField source="mediaObject" reference="media_objects" link={false}>
					<WithRecord label="media" render={record => (
						<Box sx={{
							display: 'block',
							textAlign: 'center',
							width: '100%',
							'& .RaImageField-image': {
								width: width, height: height, objectFit: 'contain', margin: '0 0 8px 0'
							}
						}}>
							<img src={`${record.contentUrl}`} className="RaImageField-image" alt=""/>
						</Box>
					)} />
				</ReferenceField>
			)}
			<MediaModal/>
		</>
	)
}