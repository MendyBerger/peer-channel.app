class RtcService extends EventTarget {

	pc;
	dataChannel;;

	constructor(){
		super()
		window.s = this;
	}

	setPeerConnection(peerConnection){
		window.pc = peerConnection;
		this.pc = peerConnection;
		this._setupPeerConnectionEventListeners();
		if(this.pc && this.dataChannel)
			this.dispatchEvent(new Event("connected"));
	}

	setDataChannel(dataChannel){
		window.dc = dataChannel;
		this.dataChannel = dataChannel;
		this._setupDataChannelEventListeners();
		if(this.pc && this.dataChannel)
			this.dispatchEvent(new Event("connected"));
	}

	_setupPeerConnectionEventListeners(){
		this.pc.addEventListener("negotiationneeded", e => {
			console.log(e, e.type);
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

	_onDataChannelMessage(e){
		console.log(e);
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
	}
	_onRemoteIceCandidate(candidate){
		this.pc.addIceCandidate(candidate);
	}
	_onRemoteOffer(description){
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
	_onRemoteAnswer(description){
		this.pc.setRemoteDescription(description);
	}

}
export default new RtcService;
