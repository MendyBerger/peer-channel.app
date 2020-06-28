import React from 'react';
import shareService from '../services/ShareService';

function CreateOffer(props) {
	return (
		<div>
			<button onClick={shareService.share}>Share offer</button>
			<button onClick={shareService.copy}>Copy offer</button>
		</div>
	);
}

export default CreateOffer;
