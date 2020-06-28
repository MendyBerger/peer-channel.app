import React from 'react';
import shareService from '../services/ShareService';

function Start(props) {
	return (
		<div>
			<input type="file" />

			<button onClick={shareService.share}>Share offer</button>
			<button onClick={shareService.copy}>Copy offer</button>
		</div>
	);
}

export default Start;
