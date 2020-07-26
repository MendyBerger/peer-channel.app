import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, IconButton } from '@material-ui/core';
import { PlayArrow, Pause, VolumeUp, VolumeDown, VolumeOff, VolumeMute, Fullscreen, FullscreenExit } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
	},
});


function VideoControls(props) {
	const [value, setValue] = useState(30);

	const classes = useStyles();

	const handleChange = (event, newValue) => {
		console.log(newValue);
		props.onSeek(newValue);
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			{/* <Slider
				value={value}
				min={0}
				max={300}
				onChange={console.log}
				onChange={handleChange}
			/> */}
			{
				props.paused ? (
					<IconButton color="primary" onClick={props.onPlay} aria-label="Play">
						<PlayArrow fontSize="large" />
					</IconButton>
				) : (
					<IconButton color="primary" onClick={props.onPause} aria-label="Pause">
						<Pause fontSize="large" />
					</IconButton>
				)
			}
			{
				props.muted ? (
					<IconButton color="primary" onClick={props.onUnmute} aria-label="Unmute">
						<VolumeOff fontSize="large" />
					</IconButton>
				) : (
					<IconButton color="primary" onClick={props.onMute} aria-label="Mute">
						<VolumeMute fontSize="large" />
					</IconButton>
				)
			}
			<IconButton disabled={props.volume >= 1} color="primary" onClick={props.onVolumeUp} aria-label="Volume up">
				<VolumeUp fontSize="large" />
			</IconButton>
			<IconButton disabled={props.volume <= 0} color="primary" onClick={props.onVolumeDown} aria-label="Volume down">
				<VolumeDown fontSize="large" />
			</IconButton>
			{
				props.fullscreen ? (
					<IconButton color="primary" onClick={props.onFullscreenExit} aria-label="Exit fullscreen">
						<FullscreenExit fontSize="large" />
					</IconButton>
				) : (
					<IconButton color="primary" onClick={props.onFullscreen} aria-label="Fullscreen">
						<Fullscreen fontSize="large" />
					</IconButton>
				)
			}
		</div>
	);
}

export default VideoControls;
