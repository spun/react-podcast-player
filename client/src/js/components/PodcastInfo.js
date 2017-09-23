import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import DefaultPodcastImage from "../../img/default.png";

// Componente que muestra la información detallada de un podcast
const PodcastInfo = ({
	match,
	details,
	suscribe,
	unsuscribe,
	isUserSuscribed
}) => {
	let podcastImgSrc = DefaultPodcastImage;
	if (details.feed_image_url) {
		podcastImgSrc = details.feed_image_url;
	}

	return (
		<div className="card">
			<div className="content">
				<div className="media">
					{/* Imagen del podcast*/}
					<div className="media-left">
						<img
							width="180px"
							className="media-object img-rounded"
							src={podcastImgSrc}
						/>
					</div>

					<div className="media-body">
						{/* Titulo del podcast*/}
						<h4 className="media-heading title">
							{details.feed_title}
						</h4>
						{/* Autor del podcast*/}
						<p className="category">
							{details.feed_author}
						</p>
						{/* Urls del podcast (xml, web)*/}
						<p>
							<a
								href={details.feed_web_url}
								target="_blank"
								className="label label-primary">
								Web{" "}
								<span
									className="glyphicon glyphicon-share"
									aria-hidden="true"
								/>
							</a>
							<span> </span>
							<a
								href={details.feed_xml_url}
								target="_blank"
								className="label label-warning">
								RSS{" "}
								<span
									className="glyphicon glyphicon-share"
									aria-hidden="true"
								/>
							</a>
						</p>
						{/* Descripción del podcast*/}
						<p className="small">
							{details.feed_description}
						</p>
					</div>

					{/* Botón de añadir/anular suscripción*/}
					<div className="media-right">
						{isUserSuscribed == true
							? <button
									className="btn btn-danger btn-xs"
									onClick={e => unsuscribe(details.feed_id)}>
									<span
										className="glyphicon glyphicon-remove-circle"
										aria-hidden="true"
									/>{" "}
									Unsubscribe
								</button>
							: <button
									className="btn btn-success btn-xs"
									onClick={e => suscribe(details.feed_id)}>
									<span
										className="glyphicon glyphicon glyphicon-ok-circle"
										aria-hidden="true"
									/>{" "}
									Subscribe
								</button>}
					</div>
				</div>

				{/* Tiempo desde la última actualización*/}
				<div className="footer">
					<hr />
					<div className="stats">
						<i className="ti-reload" /> Updated 0 minutes ago
						(to-do)
					</div>
				</div>
			</div>
		</div>
	);
};

export default PodcastInfo;
