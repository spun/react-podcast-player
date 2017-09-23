import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Uso de funciones nativas del navegador

import store from "./store/Store";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";

import { createBrowserHistory } from "history";

import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Logout from "./containers/Logout";
import App from "./containers/App";

var browserHistory = createBrowserHistory();

// Comprobar si hay un usuario logueado
const loggedIn = () => {
	if (localStorage.userToken) {
		return true;
	} else {
		return false;
	}
};

// Componente base
const Root = ({ store }) =>
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/login" component={SignIn} />
				<Route path="/register" component={SignUp} />
				<Route path="/logout" component={Logout} />
				{/* Si no es ninguna de las rutas anteriores y está logueado, entrar en appliación*/}
				<Route
					path="/"
					render={() =>
						loggedIn() ? <App /> : <Redirect to="/login" />}
				/>
			</Switch>
		</Router>
	</Provider>;

Root.propTypes = {
	store: PropTypes.object.isRequired
};

ReactDOM.render(<Root store={store} />, app);
