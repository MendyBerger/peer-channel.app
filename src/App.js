import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import Start from './components/Start';
import AcceptOffer from './components/AcceptOffer';
import AcceptAnswer from './components/AcceptAnswer';
import Live from './components/Live';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/start" />
				</Route>
				<Route path="/start">
					<Start />
				</Route>
				<Route path="/accept-offer">
					<AcceptOffer />
				</Route>
				<Route path="/accept-answer">
					<AcceptAnswer />
				</Route>
				<Route path="/live">
					<Live />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
