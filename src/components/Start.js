import React from 'react';
import shareService from '../services/ShareService';
import rtcService from '../services/RtcService';

rtcService.getOfferData()

function Start(props) {
	return (
		<div>
			<button onClick={shareService.share}>Share offer</button>
			<button onClick={shareService.copy}>Copy offer</button>
		</div>
	);
}

export default Start;
