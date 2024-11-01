import FileUploadIcon from "@mui/icons-material/FileUpload";
import {Button} from "@mui/material";
import React from "react";
import {useCreate, useRefresh} from "react-admin";
import {useMedia} from "./store/MediaContext";

export const Uploader = () => {
	const {source} = useMedia()
	const refresh = useRefresh()
	const [create, { isLoading, error }] = useCreate();
	const upload = (e: React.ChangeEvent<HTMLInputElement>): void => {
		// @ts-ignore
		const file = e.target.files[0]

		const data = {
			file: transformFile(file),
			source: source
		}
		create('media_objects', {data}, {onSuccess: (data) => {
			refresh()
		}})
	}

	const transformFile = (file: File) => {
		if (!(file instanceof File)) {
			return file;
		}

		const preview = URL.createObjectURL(file);
		return  {
			rawFile: file,
			src: preview,
			title: file.name,
		};
	};

	return(
		<Button variant="contained" startIcon={<FileUploadIcon />} component="label">
			Upload
			<input onChange={upload} hidden accept="image/*" type="file" />
		</Button>
	)
}