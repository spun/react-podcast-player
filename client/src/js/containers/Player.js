import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	startAudio,
	resumeAudio,
	pauseAudio,
	endedAudio,
	changeVolume,
	setDuration,
	changeProgress,
	changePlaybackRate
} from "../actions/playerActions";

import DefaultPodcastImage from "../../img/default.png";
import "./player.css";

function toHHMMSS(time) {
	var sec_num = parseInt(time, 10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = hours + ":" + minutes + ":" + seconds;
	return time;
}

// Componente que crea un reproductor de audio
class Player extends React.Component {
	componentWillMount() {
		this.player = new Audio();
		// Play progress
		this.player.addEventListener("timeupdate", () => {
			this.props.changeProgress(this.player.currentTime);
		});

		this.player.addEventListener("ended", () => {
			this.props.endedAudio(this.props.playerInfo.audio.audio_id);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		// Audio source
		if (this.player.src != this.props.playerInfo.audio.audio_url) {
			this.player.src = this.props.playerInfo.audio.audio_url;
			this.player.currentTime = this.props.playerInfo.progress;
		}

		// Play status
		if (this.props.playerInfo.isPlaying && this.player.paused) {
			this.player
				.play()
				.then(() => {
					this.props.setDuration(this.player.duration);
				})
				.catch(err => console.err("!>" + err));
		} else if (!this.props.playerInfo.isPlaying && !this.player.paused) {
			this.player.pause();
		}

		// Volume value
		var adjustedVolume = this.props.playerInfo.volume / 100;
		if (adjustedVolume != this.player.volume) {
			this.player.volume = adjustedVolume;
		}

		// Playback rate
		if (this.player.playbackRate != this.props.playerInfo.playbackRate) {
			this.player.playbackRate = this.props.playerInfo.playbackRate;
		}
	}

	handlerTogglePlayPause() {
		if (this.props.playerInfo.isPlaying) {
			this.props.pauseAudio();
		} else {
			this.props.resumeAudio();
		}
	}

	handlerVolumeChange() {
		var volumeValue = this.refs.volumebar.value;
		this.props.changeVolume(volumeValue);
	}

	handlerProgressChange() {
		var progressValue = this.refs.progressbar.value;
		this.props.changeProgress(progressValue);
		this.player.currentTime = progressValue;
	}

	handlerDecreasePlaybackRate() {
		var currenPlaybackRate = this.props.playerInfo.playbackRate;
		var newPlaybackRate =
			Math.round((currenPlaybackRate - 0.1) * 100) / 100;
		this.props.changePlaybackRate(newPlaybackRate);
	}

	handlerResetPlaybackRate() {
		this.props.changePlaybackRate(1);
	}

	handlerIncreasePlaybackRate() {
		var currenPlaybackRate = this.props.playerInfo.playbackRate;
		var newPlaybackRate =
			Math.round((currenPlaybackRate + 0.1) * 100) / 100;
		this.props.changePlaybackRate(newPlaybackRate);
	}

	handlerSkipBack() {
		var newProgress = this.props.playerInfo.progress - 10;
		this.player.currentTime = newProgress;
	}

	handlerSkipForward() {
		var newProgress = this.props.playerInfo.progress + 30;
		this.player.currentTime = newProgress;
	}

	getGlobalOffset(el) {
		var x = 0,
			y = 0;
		while (el) {
			x += el.offsetLeft;
			y += el.offsetTop;
			el = el.offsetParent;
		}
		return { left: x, top: y };
	}

	render() {
		const { playerInfo } = this.props;

		var formatedTime = {
			progress: toHHMMSS(Math.round(playerInfo.progress)),
			duration: toHHMMSS(Math.round(playerInfo.duration))
		};

		let audioFeedImageUrl = DefaultPodcastImage;
		if (playerInfo.audio && playerInfo.audio.audio_feed_image_url) {
			audioFeedImageUrl = playerInfo.audio.audio_feed_image_url;
		}

		return (
			<div className="player">
				<div className="player-box-bar row text-center">
					<div className="col-xs-8 col-sm-10 col-lg-11">
						<input
							type="range"
							ref="progressbar"
							className="audio-progress-bar"
							onChange={e => this.handlerProgressChange()}
							value={playerInfo.progress}
							min="0"
							max={playerInfo.duration}
						/>
					</div>
					<div className="col-xs-4 col-sm-2 col-lg-1 text-center">
						<div
							className="btn-group"
							role="group"
							aria-label="...">
							<button
								className="btn btn-primary btn-xs"
								onClick={e =>
									this.handlerDecreasePlaybackRate()}>
								-
							</button>
							<button
								className="btn btn-primary btn-xs"
								onClick={e => this.handlerResetPlaybackRate()}>
								{playerInfo.playbackRate}x
							</button>
							<button
								className="btn btn-primary btn-xs"
								onClick={e =>
									this.handlerIncreasePlaybackRate()}>
								+
							</button>
						</div>
					</div>
				</div>

				<div className="row player-box-content">
					<div
						className="col-xs-2 col-sm-7 col-md-5 row player-left"
						style={{
							backgroundImage: "url(" + audioFeedImageUrl + ")"
						}}>
						<p className="col-xs-10  hidden-xs">
							{playerInfo.audio.audio_title
								? <Link
										title="Go to feed page"
										to={`/podcasts/${playerInfo.audio
											.audio_feed}/audios/${playerInfo.audio
											.audio_id}`}>
										{playerInfo.audio.audio_title}
									</Link>
								: "-"}
						</p>
						<p className="col-xs-10  hidden-xs small">
							{formatedTime.progress} / {formatedTime.duration}
						</p>
					</div>

					<div className="col-xs-6 col-sm-3 col-md-2 player-center text-center">
						<div
							className="btn-group"
							role="group"
							aria-label="...">
							<button
								type="button"
								className="btn btn-success btn-fill"
								onClick={e => this.handlerSkipBack()}>
								<span className="glyphicon glyphicon-backward" />
							</button>
							<button
								type="button"
								className="btn btn-success btn-fill"
								onClick={e => this.handlerTogglePlayPause()}>
								{playerInfo.isPlaying
									? <span className="glyphicon glyphicon-pause" />
									: <span className="glyphicon glyphicon-play" />}
							</button>

							<button
								type="button"
								className="btn btn-success btn-fill"
								onClick={e => this.handlerSkipForward()}>
								<span className="glyphicon glyphicon-forward" />
							</button>
						</div>
					</div>

					<div className="player-right">
						<div className="col-xs-4 col-sm-2 col-md-1 col-md-offset-4 player-right text-center">
							<input
								type="range"
								ref="volumebar"
								className="audio-volume-bar"
								onChange={e => this.handlerVolumeChange()}
								value={playerInfo.volume}
								min="0"
								max="100"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		playerInfo: store.player
	};
}

function mapDispatchToProps(dispatch) {
	return {
		resumeAudio: () => {
			dispatch(resumeAudio());
		},
		pauseAudio: () => {
			dispatch(pauseAudio());
		},
		endedAudio: audioId => {
			dispatch(endedAudio(audioId));
		},
		changeVolume: volumeValue => {
			dispatch(changeVolume(volumeValue));
		},
		changeProgress: progressValue => {
			dispatch(changeProgress(progressValue));
		},
		setDuration: duration => {
			dispatch(setDuration(duration));
		},
		changePlaybackRate: newPlaybackRate => {
			dispatch(changePlaybackRate(newPlaybackRate));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
