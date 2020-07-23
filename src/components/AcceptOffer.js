import React, { useState, useEffect } from 'react';
import shareService from "../services/ShareService";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import rtcSetupAnswererService from '../services/RtcSetupAnswererService';
import rtcService from '../services/RtcService';
import Snackbar from '@material-ui/core/Snackbar';

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

function AcceptOffer(props) {
	let classes = useStyles();
	const [open, setOpen] = useState(false);

	history = props.history;

	useEffect(() => {
		rtcSetupAnswererService.setupAnswerer();
		takeOfferFromUrl();
		rtcService.addEventListener("connected", e => {
			history.push("select-video");
		});
	}, []);

	async function share() {
		await shareService.share(`${window.location.origin}/accept-answer#${rtcSetupAnswererService.getBase64()}`);
		setOpen(true);
	}
	async function copy() {
		await shareService.copy(`${window.location.origin}/accept-answer#${rtcSetupAnswererService.getBase64()}`);
		setOpen(true);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Typography>Now reply with the answer with your friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share answer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy answer</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Copied to clipboard!" />
		</div>
	);
}

export default AcceptOffer;
