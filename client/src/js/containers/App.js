import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, NavLink, withRouter } from "react-router-dom";

import { checkLoggedUser } from "../actions/userActions";

import Suscriptions from "./Suscriptions";
import PodcastPage from "./PodcastPage";
import Player from "./Player";

import NavBar from "../components/NavBar";
import UserProfile from "./UserSettings";
import About from "../components/About";
import AddSuscription from "./AddSuscription";

import "../../css/main.css";

// Componente de la aplicación que ven los usuario identificados
class App extends React.Component {
	componentWillMount() {
		// Recuperamos los datos de sesión guardados del usuario
		this.props.checkLoggedUser();
	}

	render() {
		const { match, userEmail } = this.props;

		return (
			<div className="app-wrapper">
				<div className="top-container">
					{/* Suscriptions sidebar*/}
					<div
						className="sidebar"
						data-background-color="white"
						data-active-color="danger">
						<Suscriptions />
					</div>
					<div className="main-panel">
						{/* Top navbar */}
						<NavBar userEmail={userEmail} />

						{/* Main content*/}
						<div className="content">
							<div className="container-fluid">
								<Switch>
									{/* Add suscription Route */}
									<Route
										path="/add"
										component={AddSuscription}
									/>

									{/* Podcast detail page Route */}
									<Route
										path="/podcasts/:id"
										component={PodcastPage}
									/>

									{/* User profile page Route */}
									<Route
										path="/account"
										component={UserProfile}
									/>

									{/* About page Route */}
									<Route path="/about" component={About} />

									{/* Default Route */}
									<Route
										component={() =>
											<div className="center text-center">
												<p>
													<b>Select a podcast</b> from
													your suscriptions list
													<br />
													or{" "}
													<Link to={"/add"}>
														add a new one
													</Link>
												</p>
											</div>}
									/>
								</Switch>
							</div>
						</div>
					</div>
				</div>
				<Player />
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		userEmail: store.user.email
	};
}

function mapDispatchToProps(dispatch) {
	return {
		checkLoggedUser: () => {
			dispatch(checkLoggedUser());
		}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
