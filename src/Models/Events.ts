export class MediaControlEvent {
	type: 'mediaControl';
	data: MediaControlEventData;
}
export interface MediaControlEventData {
	type: MediaControlEventType;
};
export type MediaControlEventType = 'play' | 'pause' | 'seek';

export class NewIceCandidateEvent {
	type: 'iceCandidate';
	candidate: RTCIceCandidate;
}

export class NewDescriptionEvent {
	type: 'answer' | 'offer';
	description: RTCSessionDescription;
}
