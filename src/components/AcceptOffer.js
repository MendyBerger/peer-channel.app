import React, { useRef, useEffect } from 'react';
import shareService from "../services/ShareService";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import rtcService from '../services/RtcService';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});


function takeOfferFromUrl(){
	rtcService.bdc_acceptDataChannelOffer(window.location.hash.substring(1));
}


rtcService.pc.addEventListener("track", e => {
	console.log(e);
	// videoEl.current.srcObject = e.streams[0];
});

rtcService.pc.addEventListener("negotiationneeded", e => {
	console.log(e);
});

function share() {
	shareService.share(`${window.location.origin}/accept-answer#${rtcService.bdc_getBase64()}`);
}
function copy() {
	shareService.copy(`${window.location.origin}/accept-answer#${rtcService.bdc_getBase64()}`);
}

function AcceptOffer(props) {
	// videoEl = useRef();
	let classes = useStyles();

	useEffect(() => {
		takeOfferFromUrl();
	}, []);

	return (
		<div className={classes.root}>
			<Typography>Now reply with the answer with your friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share answer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy answer</Button>
			{/* <video ref={videoEl} controls /> */}
		</div>
	);
}

export default AcceptOffer;
