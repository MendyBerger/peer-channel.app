import React from 'react';
import shareService from '../services/ShareService';
import rtcService from '../services/RtcService';

async function share(){
	const s = await rtcService.getOfferData();
	shareService.share(s);
}
async function copy(){
	const s = await rtcService.getOfferData();
	shareService.copy(s);
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
