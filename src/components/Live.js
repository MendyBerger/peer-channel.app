import React, { useEffect, useRef, useState } from 'react';

import rtcService from '../services/RtcService';

// let videoObjectUrl;
let setObjectUrlG;
let videoElement;

 function initVideo() {
	// console.log(videoElement.current);
	let videoFile = rtcService.___addVideoFile;
	setObjectUrlG(URL.createObjectURL(videoFile));


	// let objectUrl = URL.createObjectURL(videoFile)

	// let videoElement = document.createElement("video");
	// videoElement.src = objectUrl;

	// let stream = videoElement.captureStream(0);
	// stream.getTracks().forEach(track => {
	// 	rtcService.pc.addTrack(track, stream);
	// });

	
}

let streamToTrack = async e => {
	console.log(e.nativeEvent);
	let stream = videoElement.current.captureStream(0);

	console.log(stream);
	stream.getTracks().forEach(track => {
		rtcService.pc.addTrack(track, stream); // might be able to remove second parameter
	});
}



function Live(props) {
	videoElement = useRef();
	const [objectUrl, setObjectUrl] = useState();
	useEffect(initVideo, []);
	setObjectUrlG = setObjectUrl;

	return (
		<div>
			<video
				ref={videoElement}
				src={objectUrl}
				onCanPlay={streamToTrack}
				controls
			></video>
		</div>
	);
}

export default Live;
