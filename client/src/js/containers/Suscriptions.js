import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import SuscriptionsList from "../components/SuscriptionsList";

import { fetchSuscriptions } from "../actions/suscriptionsActions";

// Componente encargado de recuperar las suscripciones y pasarselas al componente lista
class Suscriptions extends React.Component {
	componentWillMount() {
		// Iniciamos la petición de los podcasts del usuario
		this.props.dispatch(fetchSuscriptions());
	}

	render() {
		const { suscriptions } = this.props;

		return (
			<div className="sidebar-wrapper">
				<div className="logo">
					<Link to={"/"} className="simple-text">
						My suscriptions
					</Link>
				</div>
				<SuscriptionsList list={suscriptions} />
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		suscriptions: store.suscriptions.suscriptions
	};
}

export default withRouter(connect(mapStateToProps)(Suscriptions));
