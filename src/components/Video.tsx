// Disclaimer: I ended up disabling some types (with any) in this file as it became a bit too complex
// This file would probably need a bit refactoring before it can handle types

import React, { useRef, useEffect, forwardRef, useState, SyntheticEvent } from 'react';
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

interface VideoComponentProps {
	src?: string;
	srcObject?: MediaStream;
	onCanPlay?: (e: SyntheticEvent) => void;
}

let Video = forwardRef(function(props: VideoComponentProps, videoElement: any) {

	const classes = useStyles();

	let [fullscreen, setFullscreen] = useState(false);
	let [pictureInPicture, setPictureInPicture] = useState(false);
	let [paused, setPaused] = useState(false);
	let [muted, setMuted] = useState(false);

	let rootElement: any = useRef();

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

	function onVolumeChange(volume: number){
		videoElement.current.volume = volume / 100;
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
	function onTogglePictureInPicture(){
		if(!pictureInPicture) {
			setPictureInPicture(true);
			videoElement.current.requestPictureInPicture();
		} else {
			setPictureInPicture(false);

			// @ts-ignore TypeScript doesn't know of the method yet
			document.exitPictureInPicture();
		}
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
				onVolumeChange={onVolumeChange}
				onTogglePictureInPicture={onTogglePictureInPicture}
				paused={paused}
				fullscreen={fullscreen}
				muted={muted}
			/>
		</div>
	);
});

export default Video;