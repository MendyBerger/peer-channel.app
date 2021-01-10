import React, { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';

import rtcService from '../services/RtcService';
import Video from './Video';

interface VideoElementWithCaptureStream extends HTMLVideoElement {
	captureStream(frameRate?: number): MediaStream;
}

let videoElement: MutableRefObject<HTMLVideoElement | undefined>;

function initVideo() {
	if(rtcService.___addVideoFile){
		let videoFile = rtcService.___addVideoFile;
		videoElement.current!.src = URL.createObjectURL(videoFile);
	} else {
		videoElement.current!.srcObject = rtcService.___videoStream;
	}
}

let streamToTrack = async (e: SyntheticEvent) => {
	console.log(e.nativeEvent);
	// @ts-ignore
	HTMLVideoElement.prototype.captureStream = HTMLVideoElement.prototype.captureStream || HTMLVideoElement.prototype.mozCaptureStream;
	let stream = (videoElement.current as VideoElementWithCaptureStream).captureStream(0);

	console.log(stream);
	stream.getTracks().forEach(track => {
		rtcService.pc.addTrack(track, stream); // might be able to remove second parameter
	});
}

function Live() {
	videoElement = useRef();
	useEffect(initVideo, []);

	return (
		<div>
			<Video
				ref={videoElement}
				onCanPlay={streamToTrack}
			/>
		</div>
	);
}

export default Live;
