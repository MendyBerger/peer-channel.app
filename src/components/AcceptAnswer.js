import React from 'react';
import rtcService from '../services/RtcService';

function AcceptAnswer(props) {
	rtcService.bdc_acceptAnswer(window.location.hash.substring(1));
	// rtcService.bdc_acceptDataChannelAnswer(window.location.hash.substring(1))
	return (
		<div>
			You can now close this tab and go back to the video.
		</div>
	);
}

export default AcceptAnswer;
