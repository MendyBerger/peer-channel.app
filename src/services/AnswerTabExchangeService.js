import { BroadcastChannel } from 'broadcast-channel'; // WebKit polyfill

class AnswerTabExchangeService {

	broadcastAnswerChannel = new BroadcastChannel("answer_channel");

	acceptAnswer(base64){
		this.broadcastAnswerChannel.postMessage(base64);
	}

}

export default new AnswerTabExchangeService;