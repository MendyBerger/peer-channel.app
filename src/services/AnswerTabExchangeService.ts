class AnswerTabExchangeService {

	broadcastAnswerChannel = new BroadcastChannel("answer_channel");

	acceptAnswer(base64: string){
		this.broadcastAnswerChannel.postMessage(base64);
	}

}

export default new AnswerTabExchangeService;