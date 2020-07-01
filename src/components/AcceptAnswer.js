import React from 'react';
import rtcService from '../services/RtcService';

function AcceptAnswer(props) {
	rtcService.acceptAnswer();
	return (
		<div>
			Opening the correct tab...
		</div>
	);
}

export default AcceptAnswer;
