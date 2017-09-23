import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Componente que muestra una lista de audios y controla sus acciones
const PodcastAudiosList = ({
	match,
	list,
	loadMoreAudios,
	playAudio,
	pauseAudio,
	markAudioAsPlayed,
	markAudioAsPending,
	currentAudioIdPlaying,
	isCurrentAudioPlaying
}) => {
	// Generar la fecha de publicación del audio corta
	function getMinimalDate(dateString) {
		var date = new Date(dateString);
		var monthString = date.toLocaleString("en-us", {
			month: "short"
		});
		var dayString = date.toLocaleString("en-us", {
			day: "numeric"
		});

		return (
			<div className="text-center" title={date.toString()}>
				<span className="audio-date small ">
					{monthString}
				</span>
				<br />
				<span className="audio-date small ">
					{dayString}
				</span>
			</div>
		);
	}

	return (
		<div className="card">
			{/* Titulo de la lista */}
			<div className="header">
				<h4 className="title">Podcast audios</h4>
			</div>

			{/* Lista de audios*/}
			<div className="content">
				<ul className="list-unstyled team-members">
					{/* Comprobar si la lista está vacía*/}
					{list.length == 0
						? <p className="text-info text-center">
								This podcast has no audios
							</p>
						: list.map((audio, i) =>
								<li key={i}>
									<div className="row">
										<div className="col-xs-1">
											{getMinimalDate(audio.audio_pubdate)}
										</div>
										<div className="col-xs-9">
											<NavLink
												to={`${match.url}/audios/${audio.audio_id}`}
												activeStyle={{
													fontWeight: "bold",
													color: "green"
												}}>
												{audio.audio_title}
											</NavLink>
											<br />

											{/*menú de marcar como escuchado/pendiente*/}
											<span
												className={
													audio.listen_status ==
													"pending"
														? "text-success audio-status audio-status-pending"
														: "text-muted audio-status"
												}
												data-toggle="dropdown">
												<small>
													{audio.listen_status ==
													"pending"
														? "Pending "
														: "Played "}

													<span className="caret" />
												</small>
											</span>
											<ul className="dropdown-menu">
												{audio.listen_status ==
													"pending" &&
													<li
														onClick={e => {
															markAudioAsPlayed(
																audio
															);
														}}>
														<a href="#">
															Mark as played
														</a>
													</li>}
												{audio.listen_status !=
													"pending" &&
													<li
														onClick={e =>
															markAudioAsPending(
																audio
															)}>
														<a href="#">
															Mark as unplayed
														</a>
													</li>}
												<li>
													<a
														href={audio.audio_url}
														download>
														Download file
													</a>
												</li>
											</ul>
										</div>
										{/*Botón de reproducir*/}
										<div className="col-xs-2 text-right">
											{currentAudioIdPlaying !=
												audio.audio_id ||
											isCurrentAudioPlaying == false
												? <button
														className="btn btn-sm btn-success btn-icon"
														onClick={e =>
															playAudio(audio)}>
														<i className="ti-control-play" />
													</button>
												: <button
														className="btn btn-sm btn-success btn-icon"
														onClick={e => pauseAudio()}>
														<i className="ti-control-pause" />
													</button>}
										</div>
									</div>
								</li>
							)}
				</ul>
				{/*Botón de cargar más audios*/}
				<div className=" footer text-center">
					<button
						type="submit"
						className="btn btn-info btn-fill btn-wd"
						onClick={e => loadMoreAudios()}>
						Load more audios
					</button>
				</div>
			</div>
		</div>
	);
};
export default PodcastAudiosList;
