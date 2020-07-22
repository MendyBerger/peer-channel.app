import rtcService from "./RtcService";

class RtcSetupAnswererService {

	pc = new RTCPeerConnection;
	_iceCandidates;

	setupAnswerer(){
		this.pc.addEventListener("datachannel", e => {
			rtcService.setDataChannel(e.channel);
		})
	}

	getBase64(){
		let json = JSON.stringify({
			description: this.pc.localDescription,
			iceCandidates: this._iceCandidates,
		});
		let base64 = btoa(json);
		return base64;
	}

	acceptOffer(base64){
		const json = atob(base64);
		let obj = JSON.parse(json);
		this.pc.setRemoteDescription(obj.description)
			.then(() => this.pc.createAnswer())
			.then(answer => this.pc.setLocalDescription(answer))
			.then(() => {
				obj.iceCandidates.forEach(candidate => {
					this.pc.addIceCandidate(candidate);
				});
			})
			.then(async () => {
				this._iceCandidates = await this._getIceCandidates();
			})
			.then(() => {
				rtcService.setPeerConnection(this.pc);
			})
			.catch(console.error);
	}

	_getIceCandidates(){ // change to generator function
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
export default new RtcSetupAnswererService;
