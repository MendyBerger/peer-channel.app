import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

import SelectVideo from './components/SelectVideo';
import CreateOffer from './components/CreateOffer';
import AcceptOffer from './components/AcceptOffer';
import AcceptAnswer from './components/AcceptAnswer';
import Live from './components/Live';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/select-video" />
				</Route>
				<Route path="/select-video">
					<SelectVideo />
				</Route>
				<Route path="/create-offer">
					<CreateOffer />
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
