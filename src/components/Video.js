import React, { useRef, useEffect, forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoControls from './VideoControls';
import streamSyncService from '../services/StreamSyncService';

const useStyles = makeStyles({
	root: {
		display: "grid",
		placeItems: "center",
	},
	video: {
		maxWidth: "100%",
	},
});

let Video = forwardRef(function(props, videoElement) {

	const classes = useStyles();

	let [fullscreen, setFullscreen] = useState(false);
	let [paused, setPaused] = useState(false);
	let [muted, setMuted] = useState(false);

	let rootElement = useRef();

	useEffect(() => {
		if(props.src)
			videoElement.current.src = props.src;
		else
			videoElement.current.srcObject = props.srcObject;
	}, []);

	useEffect(() => {
		streamSyncService.addEventListener("play", () => {
			setPaused(false);
			videoElement.current.play();
		});
		streamSyncService.addEventListener("pause", () => {
			setPaused(true);
			videoElement.current.pause();
		});
		streamSyncService.addEventListener("seek", () => {
			videoElement.current.seek();
		});
	}, []);

	function onVolumeUp(){
		let newVolume = videoElement.current.volume + 0.05;
		videoElement.current.volume = newVolume <= 1 ? newVolume : 1;
	}
	function onVolumeDown(){
		let newVolume = videoElement.current.volume - 0.05;
		videoElement.current.volume = newVolume >= 0 ? newVolume : 0;
	}
	function onFullscreen(){
		setFullscreen(true);
		rootElement.current.requestFullscreen();
	}
	function onFullscreenExit(){
		setFullscreen(false);
		window.document.exitFullscreen();
	}
	function onMute(){
		setMuted(true);
		videoElement.current.muted = true;
	}
	function onUnmute(){
		setMuted(false);
		videoElement.current.muted = false;
	}

	return (
		<div className={classes.root} ref={rootElement}>
			<video
				onCanPlay={props.onCanPlay}
				autoPlay
				ref={videoElement}
				className={classes.video}
			/>
			<VideoControls
				onPlay={streamSyncService.play}
				onPause={streamSyncService.pause}
				onSeek={streamSyncService.seek}
				onFullscreen={onFullscreen}
				onFullscreenExit={onFullscreenExit}
				onMute={onMute}
				onUnmute={onUnmute}
				onVolumeUp={onVolumeUp}
				onVolumeDown={onVolumeDown}
				volume={videoElement.current?.volume}
				paused={paused}
				fullscreen={fullscreen}
				muted={muted}
			/>
		</div>
	);
});

export default Video;