import React, { useRef } from 'react';
import rtcService from "../services/RtcService";
import { useHistory } from 'react-router-dom';

function onVideoSelect(e, history){
	const file = e.target.files[0];
	rtcService.addVideoElement(file);
	history.push("create-offer");
}

function SelectVideo() {
	let history = useHistory();
	return (
		<div>
			<input onChange={e => onVideoSelect(e, history)} type="file" accept="video/*" />
		</div>
	);
}

export default SelectVideo;
