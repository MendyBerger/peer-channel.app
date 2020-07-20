class RtcService extends EventTarget {

	pc = new RTCPeerConnection;
	dataChannel = this.pc.createDataChannel("data_channel");
	broadcastAnswerChannel = new BroadcastChannel("answer_channel");

	_dcIceCandidates;

	constructor(){
		super()
		this._bdc_setupRtcDataChannel();
		this._bdc_addOnAnswer()

		window.s = this;
	}

	_bdc_addOnAnswer(){
		this.broadcastAnswerChannel.addEventListener("message", e => {
			console.log(e);
			this.bdc_acceptDataChannelAnswer(e.data)
		});
	}

	get dcDataReady(){
		return this.pc.localDescription !== undefined && this._dcIceCandidates !== undefined;
	}

	bdc_getBase64(){
		let json = JSON.stringify({
			description: this.pc.localDescription,
			iceCandidates: this._dcIceCandidates,
		});
		console.log(json);
		let base64 = btoa(json);
		return base64;
	}

	async _bdc_setupRtcDataChannel(){
		this._adc_setupRtcDataChannelEventListeners();
		let promiseArray = await Promise.all([this._bdc_generateOffer(), this._bdc_getIceCandidates()]);
		this._dcIceCandidates = promiseArray[1];
	}

	bdc_acceptDataChannelOffer(base64){
		const json = atob(base64);
		let obj = JSON.parse(json);
		this.pc.addEventListener("datachannel", e => {
			this.dataChannel = e.channel;
		});
		this.pc.setRemoteDescription(obj.description)
			.then(() => this.pc.createAnswer())
			.then(answer => this.pc.setLocalDescription(answer))
			.then(async () => {
				this._dcIceCandidates = await this._bdc_getIceCandidates();
			})
			.then(async() => {
				// let json = JSON.stringify(pc.localDescription);
				// base64 = btoa(json);
				obj.iceCandidates.forEach(candidate => {
					this.pc.addIceCandidate(candidate);
				});
			})
			.catch(console.error);
	}

	async bdc_acceptDataChannelAnswer(base64){
		const json = atob(base64);
		const obj = JSON.parse(json);
		await this.pc.setRemoteDescription(obj.description);

		obj.iceCandidates.forEach(candidate => {
			this.pc.addIceCandidate(candidate);
		});

	}

	_adc_setupRtcDataChannelEventListeners(){
		this.dataChannel.addEventListener("message", e => this._adc_onRtcDataChannelMessage(e));

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

	_adc_onRtcDataChannelMessage(e){
		let message = JSON.parse(e.data);
		if(message.type === "iceCandidate"){
			this._adc_onRemoteIceCandidate(e.data.candidate);
		}
		if(message.type === "answer"){
			this._adc_onRemoteAnswer(message.description);
		}
		if(message.type === "offer"){
			this._adc_onRemoteOffer(message.description);
		}
	}
	_adc_onRemoteIceCandidate(candidate){
		this.pc.addIceCandidate(candidate);
	}
	_adc_onRemoteOffer(description){
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
	_adc_onRemoteAnswer(description){
		this.pc.setRemoteDescription(description);
	}


	_bdc_generateOffer(){
		return new Promise((resolve, reject) => {
			this.pc.createOffer()
				.then(description => this.pc.setLocalDescription(description))
				.then(() => {
					resolve(this.pc.localDescription)
				})
				.catch(reject);
		}, { once: true });
	}

	_bdc_getIceCandidates(){ // change to generator function
		let candidateArray = [];
		return new Promise(resolve => {
			this.pc.addEventListener("icecandidate", e => { 
				if(e.candidate)
					candidateArray.push(e.candidate);
				else
					resolve(candidateArray);
			});
		});
	}

	bdc_acceptAnswer(base64){ // maybe static
		this.broadcastAnswerChannel.postMessage(base64);
	}

}
export default new RtcService;
