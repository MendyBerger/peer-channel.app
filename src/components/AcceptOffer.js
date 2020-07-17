import React, { useRef, useEffect } from 'react';
import shareService from "../services/ShareService";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});


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
	let classes = useStyles();

	useEffect(() => {
		takeOfferFromUrl();
	}, []);

	return (
		<div className={classes.root}>
			<Typography>Now reply with the answer with your friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share answer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy answer</Button>
			<video ref={videoEl} controls />
		</div>
	);
}

export default AcceptOffer;
