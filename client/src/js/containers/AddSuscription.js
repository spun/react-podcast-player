import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PodcastInfo from "../components/PodcastInfo";
import {
	deleteSuscription,
	addSuscription
} from "../actions/suscriptionsActions";
import { searchPodcastFromUrl } from "../actions/searchActions";

// Componente que muestra la página de añadir suscripciones
class AddSuscription extends React.Component {
	constructor(props) {
		super(props);
		// This binding is necessary to make `this` work in the callback
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const inputValue = this.textInput.value;
		this.textInput.value = "";
		this.props.searchPodcastFromUrl(inputValue);
	}

	render() {
		const {
			resultDetails,
			searchFetching,
			currentSuscriptions
		} = this.props;

		// Comprobamos si ya está suscrito al podcast al que intenta
		// suscribirse y reflejamos su estado
		let isUserSuscribed = false;
		if (resultDetails) {
			isUserSuscribed =
				currentSuscriptions.filter(
					suscription => suscription.feed_id == resultDetails.feed_id
				).length != 0;
		}

		return (
			<div>
				<div className="card">
					<div className="header">
						<h4 className="title">Add new suscription</h4>
					</div>
					<div className="content">
						<div className="row">
							<div className="col-md-12">
								<form onSubmit={this.onSubmitHandler}>
									<div className="form-group">
										<label>Feed address</label>
										<input
											type="text"
											className="form-control border-input"
											placeholder="Podcast RSS url"
											ref={input => {
												this.textInput = input;
											}}
										/>
									</div>
									<button
										type="submit"
										disabled={searchFetching}
										className="btn btn-primary btn-fill">
										{!searchFetching
											? "Preview"
											: "Loading"}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				{resultDetails != null &&
					<PodcastInfo
						details={resultDetails}
						suscribe={this.props.suscribePodcast}
						unsuscribe={this.props.unsuscribePodcast}
						isUserSuscribed={isUserSuscribed}
					/>}
			</div>
		);
	}
}

function mapStateToProps(store, ownProps) {
	return {
		currentSuscriptions: store.suscriptions.suscriptions,
		resultDetails: store.search.searchResult,
		searchFetching: store.search.fetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchPodcastFromUrl: podcastUrl => {
			dispatch(searchPodcastFromUrl(podcastUrl));
		},
		suscribePodcast: podcastDetails => {
			dispatch(addSuscription(podcastDetails));
		},
		unsuscribePodcast: podcastId => {
			dispatch(deleteSuscription(podcastId));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSuscription);
