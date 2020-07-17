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

import SelectVideo from './components/SelectVideo';
import CreateOffer from './components/CreateOffer';
import AcceptOffer from './components/AcceptOffer';
import AcceptAnswer from './components/AcceptAnswer';
import Live from './components/Live';

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
			</div>
		</>
	);
}

export default App;
