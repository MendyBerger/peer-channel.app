import EventTarget from "@ungap/event-target";
import rtcService from "./RtcService";

class StreamSyncService extends EventTarget {

	constructor(){
		super();
		this._setupEventListeners();
	}

	play = () => {
		rtcService.sendMediaControl({type: "play"});
		this._emit("play");
	}
	pause = () => {
		rtcService.sendMediaControl({type: "pause"});
		this._emit("pause");
	}
	seek = () => {
		rtcService.sendMediaControl({type: "seek"});
		this._emit("seek");
	}

	_setupEventListeners(){
		rtcService.addEventListener("mediaControl", e => {
			switch (e.detail.type) {
				case "play":
					this._emit("play");
					break;
				case "pause":
					this._emit("pause");
					break;
				case "seek":
					this._emit("seek");
					break;
			}
		});
	}

	_emit(type, data){
		this.dispatchEvent(new Event(type, {detail: data}));
	}

}
export default new StreamSyncService;
