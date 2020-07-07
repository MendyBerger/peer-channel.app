import React, { useRef, useEffect } from 'react';
import shareService from "../services/ShareService";


let pc = new RTCPeerConnection();
let base64;
let videoEl;

function takeOfferFromUrl(){
	let json = atob(window.location.hash.substring(1));
	let {iceCandidates, description} = JSON.parse(json);
	let candidateArray = iceCandidates;
	let id = description;
	let sessionDescription = new RTCSessionDescription(id);
	pc.setRemoteDescription(sessionDescription)
		.then(() => pc.createAnswer())
		.then(answer => {
			pc.setLocalDescription(answer);
			let json = JSON.stringify(pc.localDescription);
			base64 = btoa(json);
			candidateArray.forEach(candidate => {
				pc.addIceCandidate(candidate);
			});

			// document.addEventListener("click", () => {videoElement.play()}, {once: true})
		})
		.catch(console.error);
}

pc.addEventListener("track", e => {
	videoEl.current.srcObject = e.streams[0];
});

function share() {
	shareService.share(`${window.location.origin}/accept-answer#${base64}`);
}
function copy() {
	shareService.copy(`${window.location.origin}/accept-answer#${base64}`);
}

function AcceptOffer(props) {
	videoEl = useRef();

	useEffect(() => {
		takeOfferFromUrl();
	}, []);

	return (
		<div>
			<button onClick={share}>Share answer</button>
			<button onClick={copy}>Copy answer</button>
			<video ref={videoEl} controls />
		</div>
	);
}

export default AcceptOffer;
