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

interface VideoControlsProps {
	paused: boolean;
	muted: boolean;
	fullscreen: boolean;
	onFullscreen: () => void;
	onFullscreenExit: () => void;
	onPlay: () => void;
	onPause: () => void;
	onMute: () => void;
	onUnmute: () => void;
	onSeek: () => void;
	onVolumeChange: (volume: number) => void;
}

function VideoControls(props: VideoControlsProps) {
	const [value, setValue] = useState(30);
	const [volume, setVolume] = useState(100);

	const classes = useStyles();

	// const handleChange = (event, newValue) => {
	// 	console.log(newValue);
	// 	props.onSeek(newValue);
	// 	setValue(newValue);
	// };

	function onVolumeUp(){
		let newVolume = volume + 5;
		newVolume = newVolume <= 100 ? newVolume : 100;
		setVolume(newVolume);
		props.onVolumeChange(newVolume);
	}
	function onVolumeDown(){
		let newVolume = volume - 5;
		newVolume = newVolume >= 0 ? newVolume : 0;
		setVolume(newVolume);
		props.onVolumeChange(newVolume);
	}

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
			<IconButton disabled={volume >= 100} color="primary" onClick={onVolumeUp} aria-label="Volume up">
				<VolumeUp fontSize="large" />
			</IconButton>
			<IconButton disabled={volume <= 0} color="primary" onClick={onVolumeDown} aria-label="Volume down">
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
