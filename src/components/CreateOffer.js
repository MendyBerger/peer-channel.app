import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import shareService from '../services/ShareService';
import rtcService from '../services/RtcService';

const useStyles = makeStyles({
	root: {
		display: 'grid',
		placeItems: 'center',
		gridGap: '10px',
	},
});

async function share(){
	const s = await rtcService.getOfferData();
	shareService.share(`${window.location.origin}/accept-offer#${s}`);
}
async function copy(){
	const s = await rtcService.getOfferData();
	shareService.copy(`${window.location.origin}/accept-offer#${s}`);
}

function CreateOffer(props) {
	let classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography>Now share this offer with a friend</Typography>
			{ navigator.share && <Button variant="contained" color="primary" onClick={share}>Share offer</Button> }
			<Button variant="contained" color="primary" onClick={copy}>Copy offer</Button>
		</div>
	);
}

export default CreateOffer;
