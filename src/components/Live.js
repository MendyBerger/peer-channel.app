import React, { useEffect, useRef, useState } from 'react';

import rtcService from '../services/RtcService';

let videoElement;

 function initVideo() {
	if(rtcService.___addVideoFile){
		let videoFile = rtcService.___addVideoFile;
		videoElement.current.src = URL.createObjectURL(videoFile);
	} else {
		videoElement.current.srcObject = rtcService.___videoStream;
	}
}

let streamToTrack = async e => {
	console.log(e.nativeEvent);
	HTMLVideoElement.prototype.captureStream = HTMLVideoElement.prototype.captureStream || HTMLVideoElement.prototype.mozCaptureStream;
	let stream = videoElement.current.captureStream(0);

	console.log(stream);
	stream.getTracks().forEach(track => {
		rtcService.pc.addTrack(track, stream); // might be able to remove second parameter
	});
}



function Live(props) {
	videoElement = useRef();
	useEffect(initVideo, []);

	return (
		<div>
			<video
				ref={videoElement}
				onCanPlay={streamToTrack}
				controls
				autoPlay
			></video>
		</div>
	);
}

export default Live;
