import rtcService from "./RtcService";

class RtcSetupOffererService {

	pc = new RTCPeerConnection;
	dataChannel: RTCDataChannel;
	broadcastAnswerChannel = new BroadcastChannel("answer_channel");
	_iceCandidates: RTCIceCandidate[];

	setupOfferer() {
		this._addOnAnswer();
		this.dataChannel = this.pc.createDataChannel("data_channel");
		rtcService.setDataChannel(this.dataChannel);
		this._generateOffer();
	}

	getBase64(): string {
		let json = JSON.stringify({
			description: this.pc.localDescription,
			iceCandidates: this._iceCandidates,
		});
		let base64 = btoa(json);
		return base64;
	}

	acceptAnswer(base64: string) {
		this.broadcastAnswerChannel.postMessage(base64);
	}

	_addOnAnswer() {
		this.broadcastAnswerChannel.addEventListener("message", e => {
			this._onAnswer(e.data);
		});
	}

	_generateOffer() {
		return new Promise((resolve, reject) => {
			this.pc.createOffer()
				.then(description => this.pc.setLocalDescription(description))
				.then(() => {
					resolve(this.pc.localDescription);
				})
				.then(async () => {
					this._iceCandidates = await this._getIceCandidates();
				})
				.catch(reject);
		});
	}

	_getIceCandidates(): Promise<RTCIceCandidate[]> { // change to generator function
		let candidateArray: RTCIceCandidate[] = [];
		return new Promise(resolve => {
			this.pc.addEventListener("icecandidate", e => {
				if (e.candidate)
					candidateArray.push(e.candidate);
				else
					resolve(candidateArray);
			});
		});
	}

	async _onAnswer(base64: string) {
		const json = atob(base64);
		const obj = JSON.parse(json);
		await this.pc.setRemoteDescription(obj.description);

		obj.iceCandidates.forEach((candidate: RTCIceCandidate) => {
			this.pc.addIceCandidate(candidate);
		});

		rtcService.setPeerConnection(this.pc);
	}

}
export default new RtcSetupOffererService;
