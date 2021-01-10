import React from 'react';
import answerTabExchangeService from '../services/AnswerTabExchangeService';

function AcceptAnswer() {
	answerTabExchangeService.acceptAnswer(window.location.hash.substring(1));
	return (
		<div>
			You can now close this tab and go back to the previous tab.
		</div>
	);
}

export default AcceptAnswer;
