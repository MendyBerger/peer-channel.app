import React from 'react';

function onVideoSelect(e){
	
}

function SelectVideo(props) {
	return (
		<div>
			<input onChange={onVideoSelect} type="file" />
		</div>
	);
}

export default SelectVideo;
