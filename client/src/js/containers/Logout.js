import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { logoutUser } from "../actions/userActions";

// Componente que cierra la sesión del usuario y redirige a login
class Logout extends React.Component {
	componentWillMount() {
		this.props.performLogout();
	}

	render() {
		return <Redirect to={`login`} />;
	}
}

function mapStateToProps(store) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		performLogout: (email, passw) => {
			dispatch(logoutUser(email, passw));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
