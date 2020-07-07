import React from 'react';
import rtcService from '../services/RtcService';

function AcceptAnswer(props) {
	rtcService.acceptAnswer();
	return (
		<div>
			You can now close this tab and go back to the video.
		</div>
	);
}

export default AcceptAnswer;
