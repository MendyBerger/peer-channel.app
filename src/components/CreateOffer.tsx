import React, { SyntheticEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';

import shareService from '../services/ShareService';
import rtcSetupOffererService from '../services/RtcSetupOffererService';
import rtcService from '../services/RtcService';
import { History } from "history";

let history;

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});

function CreateOffer(props: {history: History}) {
	history = props.history;
	let classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		rtcSetupOffererService.setupOfferer();
		rtcService.addEventListener("connected", e => {
			history.push("select-video");
		});
	}, []);

	async function share(){
		const s = rtcSetupOffererService.getBase64();
		await shareService.share(`${window.location.origin}/accept-offer#${s}`);
	}
	async function copy(){
		const s = rtcSetupOffererService.getBase64();
		await shareService.copy(`${window.location.origin}/accept-offer#${s}`);
		setOpen(true);
	}

	const handleClose = (event: SyntheticEvent, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Typography>Share the offer with your friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share offer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy offer</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Copied to clipboard!" />
		</div>
	);
}

export default CreateOffer;
