import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PodcastInfo from "../components/PodcastInfo";
import PodcastAudiosList from "../components/PodcastAudiosList";

import {
	deleteSuscription,
	addSuscription
} from "../actions/suscriptionsActions";
import {
	fetchPodcastDetails,
	fetchPodcastAudios,
	fetchPodcastNextAudios
} from "../actions/podcastActions";
import {
	markAudioAsPending,
	markAudioAsListened
} from "../actions/audiosActions";
import { startAudio, pauseAudio } from "../actions/playerActions";

// Componente encargado de mostrar la página (detalles y audios) del podcst seleccionado
class PodcastPage extends React.Component {
	constructor(props) {
		super(props);
		// This binding is necessary to make `this` work in the callback
		this.fetchPodcastNextAudios = this.fetchPodcastNextAudios.bind(this);
		this.playAudio = this.playAudio.bind(this);
	}

	componentWillMount() {
		// Iniciamos la petición de los detalles y los audios del podcast
		this.props.fetchPodcastDetails(this.props.podcastId);
		this.props.fetchPodcastAudios(this.props.podcastId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.podcastId !== this.props.podcastId) {
			// Iniciamos la petición de los detalles y los audios del podcast
			this.props.fetchPodcastDetails(nextProps.podcastId);
			this.props.fetchPodcastAudios(nextProps.podcastId);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.podcastId !== this.props.podcastId) {
			// Scroll podcast detail page to top
			document.getElementsByClassName("main-panel")[0].scrollTop = 0;
		}
	}

	// Audios pagination
	fetchPodcastNextAudios() {
		const { podcastId, podcastAudios } = this.props;
		const lastAudioId = podcastAudios[podcastAudios.length - 1].audio_id;

		this.props.fetchPodcastNextAudios(podcastId, lastAudioId);
	}

	playAudio(audio, feed) {
		var progressTime = 0;
		if (audio.listen_time) {
			progressTime = audio.listen_time;
		}
		audio.audio_feed = this.props.podcastDetails.feed_id;
		audio.audio_feed_image_url = this.props.podcastDetails.feed_image_url;

		// Acción de reproducción del audio seleccionado
		this.props.playAudio(audio, progressTime);
	}

	render() {
		const {
			match,
			podcastDetails,
			podcastAudios,
			currentSuscriptions,
			currentAudioIdPlaying,
			isCurrentAudioPlaying
		} = this.props;

		let isUserSuscribed = false;
		if (podcastDetails) {
			isUserSuscribed =
				currentSuscriptions.filter(
					suscription => suscription.feed_id == podcastDetails.feed_id
				).length != 0;
		}

		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						{/* Detalles del podcast seleccionado*/}
						<PodcastInfo
							details={podcastDetails}
							suscribe={this.props.suscribePodcast}
							unsuscribe={this.props.unsuscribePodcast}
							isUserSuscribed={isUserSuscribed}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						{/* Audios del podcast seleccionado*/}
						<PodcastAudiosList
							match={match}
							list={podcastAudios}
							loadMoreAudios={this.fetchPodcastNextAudios}
							playAudio={this.playAudio}
							pauseAudio={this.props.pauseAudio}
							markAudioAsPlayed={this.props.markAudioAsPlayed}
							markAudioAsPending={this.props.markAudioAsPending}
							currentAudioIdPlaying={currentAudioIdPlaying}
							isCurrentAudioPlaying={isCurrentAudioPlaying}
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(store, ownProps) {
	const podcastId = ownProps.match.params.id;

	return {
		podcastId,
		podcastAudios: store.audios.audios,
		podcastDetails: store.podcast.podcastDetails,
		currentSuscriptions: store.suscriptions.suscriptions,
		currentAudioIdPlaying: store.player.audio.audio_id,
		isCurrentAudioPlaying: store.player.isPlaying
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPodcastDetails: podcastId => {
			dispatch(fetchPodcastDetails(podcastId));
		},
		suscribePodcast: podcastId => {
			dispatch(addSuscription(podcastId));
		},
		unsuscribePodcast: podcastId => {
			dispatch(deleteSuscription(podcastId));
		},
		fetchPodcastAudios: podcastId => {
			dispatch(fetchPodcastAudios(podcastId));
		},
		fetchPodcastNextAudios: (podcastId, lastAudioId) => {
			dispatch(fetchPodcastNextAudios(podcastId, lastAudioId));
		},
		playAudio: (audio, progressTime) => {
			dispatch(startAudio(audio, progressTime));
		},
		pauseAudio: (audio, progressTime) => {
			dispatch(pauseAudio());
		},
		markAudioAsPlayed: audio => {
			dispatch(markAudioAsListened(audio.audio_id));
		},
		markAudioAsPending: audio => {
			dispatch(markAudioAsPending(audio.audio_id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastPage);
