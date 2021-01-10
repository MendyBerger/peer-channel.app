import EventTarget from "@ungap/event-target";
import { MediaControlEventData } from "../Models/Events";

class RtcService extends EventTarget {

	pc: RTCPeerConnection;
	dataChannel: RTCDataChannel;

	___addVideoFile: File;
	___videoStream: MediaStream;

	setPeerConnection(peerConnection: RTCPeerConnection){
		this.pc = peerConnection;
		this._setupPeerConnectionEventListeners();
		if(this.pc && this.dataChannel)
			this.dispatchEvent(new Event("connected"));
	}

	setDataChannel(dataChannel: RTCDataChannel){
		this.dataChannel = dataChannel;
		this._setupDataChannelEventListeners();
		if(this.pc && this.dataChannel)
			this.dispatchEvent(new Event("connected"));
	}

	sendMediaControl(data: MediaControlEventData){
		this.dataChannel.send(JSON.stringify({
			type: "mediaControl",
			data,
		}));
	}

	_setupPeerConnectionEventListeners(){
		this.pc.addEventListener("negotiationneeded", e => {
			this._sentOffer();
		});
		this.pc.addEventListener("icecandidate", e => {
			if(e.candidate)
				this.dataChannel.send(JSON.stringify({
					type: "iceCandidate",
					candidate: e.candidate,
				}));
		});
	}

	_setupDataChannelEventListeners(){
		this.dataChannel.addEventListener("message", e => this._onDataChannelMessage(e));

		this.dataChannel.addEventListener("close", e => {
			console.log(e);
		});
		this.dataChannel.addEventListener("error", e => {
			console.log(e);
		});
		this.dataChannel.addEventListener("open", e => {
			console.log(e);
			this.dispatchEvent(new Event("data-channel-connected"));
			this.dataChannel.send("{\"type\":\"hay\"}");
		});
	}

	_sentOffer(){
		this.pc.createOffer()
			.then(description => this.pc.setLocalDescription(description))
			.then(() => {
				this.dataChannel.send(JSON.stringify({
					type: "offer",
					description: this.pc.localDescription,
				}));
			})
			.catch(console.error);
	}

	_onDataChannelMessage(e: MessageEvent){
		let message = JSON.parse(e.data);
		if(message.type === "iceCandidate"){
			this._onRemoteIceCandidate(message.candidate);
		}
		if(message.type === "answer"){
			this._onRemoteAnswer(message.description);
		}
		if(message.type === "offer"){
			this._onRemoteOffer(message.description);
		}
		if(message.type === "mediaControl"){
			this._onMediaControl(message.data);
		}
	}
	_onRemoteIceCandidate(candidate: RTCIceCandidate){
		this.pc.addIceCandidate(candidate);
	}
	_onRemoteOffer(description: RTCSessionDescription){
		this.pc.setRemoteDescription(description)
			.then(() => this.pc.createAnswer())
			.then(answer => this.pc.setLocalDescription(answer))
			.then(() => {
				this.dataChannel.send(JSON.stringify({
					type: "answer",
					description: this.pc.localDescription
				}))
			});
	}
	_onRemoteAnswer(description: RTCSessionDescription){
		this.pc.setRemoteDescription(description);
	}
	_onMediaControl(data: MediaControlEventData){
		this.dispatchEvent(new CustomEvent<MediaControlEventData>("mediaControl", {detail: data}));
	}

}
export default new RtcService;
