import React, { useRef } from 'react';
import rtcService from "../services/RtcService";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: "20px",
	},
	input: {
		display: 'none',
	},
});

function onVideoSelect(e, history) {
	const file = e.target.files[0];
	// rtcService.addVideoElement(file);
	history.push("create-offer");
}

function SelectVideo() {
	let history = useHistory();
	let classes = useStyles();
	return (
		<div className={classes.root}>
			<Typography>To start a stream please choose a video.</Typography >
			<Button
				component="label"
				variant="contained"
				color="primary"
			>
				Choose Video
				<input
					className={classes.input}
					onChange={e => onVideoSelect(e, history)}
					type="file"
					accept="video/*"
				/>
			</Button>
		</div>
	);
}

export default SelectVideo;
