import React, { useRef, useEffect } from 'react';
import shareService from "../services/ShareService";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import rtcSetupAnswererService from '../services/RtcSetupAnswererService';
import rtcService from '../services/RtcService';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});


function takeOfferFromUrl(){
	rtcSetupAnswererService.acceptOffer(window.location.hash.substring(1));
}

let history;

function share() {
	shareService.share(`${window.location.origin}/accept-answer#${rtcSetupAnswererService.getBase64()}`);
}
function copy() {
	shareService.copy(`${window.location.origin}/accept-answer#${rtcSetupAnswererService.getBase64()}`);
}

function AcceptOffer(props) {
	let classes = useStyles();

	history = props.history;

	useEffect(() => {
		rtcSetupAnswererService.setupAnswerer();
		takeOfferFromUrl();
		rtcService.addEventListener("connected", e => {
			history.push("select-video");
		});
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
