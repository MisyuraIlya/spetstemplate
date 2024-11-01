import {Box} from "@mui/material";
import {ReferenceField, WithRecord} from "react-admin";

export const ImageField = () => (
	<ReferenceField source="mediaObject" reference="media_objects" link={false}>
		<WithRecord label="media" render={record => (
			<Box sx={{
				'& .RaImageField-image': {
					display: "block",
					margin: 0,
					width: "100px",
					height: "40px",
					objectFit: "contain"
				}
			}}>
				<img src={`${record.contentUrl}`} className="RaImageField-image" alt=""/>
			</Box>
		)} />
	</ReferenceField>
)