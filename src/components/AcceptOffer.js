import React from 'react';
import shareService from "../services/ShareService";

function AcceptOffer(props) {
	return (
		<div>
			<button onClick={shareService.share}>Share answer</button>
			<button onClick={shareService.copy}>Copy answer</button>
		</div>
	);
}

export default AcceptOffer;
