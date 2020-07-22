import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import shareService from '../services/ShareService';
import rtcSetupOffererService from '../services/RtcSetupOffererService';
import rtcService from '../services/RtcService';

let history;

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});

async function share(){
	const s = rtcSetupOffererService.getBase64();
	shareService.share(`${window.location.origin}/accept-offer#${s}`);
}
async function copy(){
	const s = rtcSetupOffererService.getBase64();
	shareService.copy(`${window.location.origin}/accept-offer#${s}`);
}

function CreateOffer(props) {
	history = props.history;
	let classes = useStyles();

	useEffect(() => {
		rtcSetupOffererService.setupOfferer();
		rtcService.addEventListener("connected", e => {
			history.push("select-video");
		});
	}, []);

	return (
		<div className={classes.root}>
			<Typography>Now share this offer with a friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share offer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy offer</Button>
		</div>
	);
}

export default CreateOffer;
