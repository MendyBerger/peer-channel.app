class RtcService {

	pc = new RTCPeerConnection;
	videoElement = document.createElement("video");
	answerChannel = new BroadcastChannel("answer_channel");

	async getOfferData() {
		let stream = this.videoElement.captureStream(0);
		stream.getTracks().forEach(track => {
			this.pc.addTrack(track, stream);
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

	addVideoElement(videoFile){
		let videoBlob = URL.createObjectURL(videoFile);
		this.videoElement.src = videoBlob;
	}

	_addOnAnswer(){
		this.answerChannel.addEventListener("message", e => {
			console.log(e);
			let sessionDescription = new RTCSessionDescription(e.data);
			console.log(sessionDescription );
			
			this.pc.setRemoteDescription(sessionDescription)
				.then(e => {
					console.log(e);

					this.videoElement.controls = true;
					document.body.appendChild(this.videoElement);
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

}
export default new RtcService;
