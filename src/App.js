import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import _ from "broadcastchannel-polyfill";

import SelectVideo from './components/SelectVideo';
import CreateOffer from './components/CreateOffer';
import AcceptOffer from './components/AcceptOffer';
import AcceptAnswer from './components/AcceptAnswer';
import Live from './components/Live';
import LiveClient from './components/LiveClient';

const useStyles = makeStyles({
	root: {
		height: "calc(100vh - 64px)",
		display: "grid",
		placeItems: "center"
	},
});

function App() {
	let classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography component="h1">PeerStream</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.root}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Redirect to="/create-offer" />
						</Route>
						<Route exact path="/select-video" component={SelectVideo} />
						<Route exact path="/create-offer" component={CreateOffer} />
						<Route exact path="/accept-offer" component={AcceptOffer} />
						<Route exact path="/accept-answer" component={AcceptAnswer} />
						<Route exact path="/live" component={Live} />
						<Route exact path="/live-client" component={LiveClient} />
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;
