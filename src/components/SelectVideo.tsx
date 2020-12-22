import React, { useRef, useEffect, SyntheticEvent } from 'react';
import rtcService from "../services/RtcService";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { History } from "history";

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

function onVideoSelect(e: SyntheticEvent, history: History) {
	const file = (e.target as HTMLInputElement).files![0];
	rtcService.___addVideoFile = file;
	history.push("live");
}

function SelectVideo() {
	let history = useHistory();
	let classes = useStyles();
	useEffect(() => {

		rtcService.pc.addEventListener("track", e => {
			history.push("live");
			rtcService.___videoStream = e.streams[0];
			console.log(e);
		});
	
		rtcService.pc.addEventListener("negotiationneeded", e => {
			console.log(e);
		});

	}, [])

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
