import React from 'react';
import shareService from '../services/ShareService';
import rtcService from '../services/RtcService';

async function share(){
	const s = await rtcService.getOfferData();
	shareService.share(`${window.location.origin}/accept-offer#${s}`);
}
async function copy(){
	const s = await rtcService.getOfferData();
	shareService.copy(`${window.location.origin}/accept-offer#${s}`);
}

function CreateOffer(props) {
	return (
		<div>
			<button onClick={share}>Share offer</button>
			<button onClick={copy}>Copy offer</button>
		</div>
	);
}

export default CreateOffer;
