class RtcService extends EventTarget {

	constructor(){
		super()
		window.s = this;
	}

	pc = new RTCPeerConnection;
	dataChannel;
	// videoElement = document.createElement("video");
	answerChannel = new BroadcastChannel("answer_channel");

	async getOfferData() {
		// let stream = this.videoElement.captureStream(0);
		// stream.getTracks().forEach(track => {
		// 	this.pc.addTrack(track, stream);
		// });
		this.dataChannel = this.pc.createDataChannel("data_channel");

		this.dataChannel.addEventListener("close", e => {
			console.log(e);
		});
		this.dataChannel.addEventListener("error", e => {
			console.log(e);
		});
		this.dataChannel.addEventListener("message", e => {
			console.log(e);
		});
		this.dataChannel.addEventListener("open", e => {
			console.log(e);
		});

		let arr = await Promise.all([this._getLocalDescription(), this._getIceCandidates()]);
		console.log(arr);
		
		let json = JSON.stringify({
			description: arr[0],
			iceCandidates: arr[1],
		});
		let base64 = btoa(json);

		this._addOnAnswer();

		return base64;
	}

	// addVideoElement(videoFile){
	// 	let videoBlob = URL.createObjectURL(videoFile);
	// 	this.videoElement.src = videoBlob;
	// }

	acceptAnswer() {
		const data = this._getAnswerDate();
		this.answerChannel.postMessage(data);
		// window.close();
	}

	_addOnAnswer(){
		this.answerChannel.addEventListener("message", e => {
			console.log(e);
			let sessionDescription = new RTCSessionDescription(e.data);
			console.log(sessionDescription );
			
			this.pc.setRemoteDescription(sessionDescription)
				.then(e => {
					console.log(e);
					this.dispatchEvent("connected");
					// this.videoElement.controls = true;
					// document.body.appendChild(this.videoElement);
				})
				.catch(console.error)
		});
	}

	_getLocalDescription(){
		return new Promise((resolve, reject) => {
			this.pc.addEventListener("negotiationneeded", () => {
				this.pc.createOffer()
					.then(e => this.pc.setLocalDescription(e))
					.then(() => {
						resolve(this.pc.localDescription)
					})
					.catch(reject);
			});
		});
	}

	_getIceCandidates(){
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

	_getAnswerDate() {
		const base64 = window.location.hash.substring(1);
		const json = atob(base64);
		const data = JSON.parse(json);
		return data;
	}

}
export default new RtcService;
