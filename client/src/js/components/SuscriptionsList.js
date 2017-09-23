import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const SuscriptionsList = ({ list }) => {
	return (
		<div>
			{/* Check if the list is empty*/}
			{list.length == 0
				? /* If the list is empty */
					<div className="center">
						<p className="text-center">
							Your susctiption list is empty. <br />
							<br />
							<Link to={"/add"}>
								<span className="glyphicon glyphicon-plus" /> Add
								a new suscription to start listening.
							</Link>
						</p>
					</div>
				: /* If the list have suscriptions to show */
					<div>
						<ul className="nav suscriptions-list">
							{list.map((suscription, i) =>
								<li key={i}>
									<NavLink
										to={`/podcasts/${suscription.feed_id}`}
										activeStyle={{
											fontWeight: "bold",
											color: "red"
										}}>
										<p className="title">
											{suscription.title}
										</p>

										{suscription.unlistened > 0
											? <p className="author text-info">
													{suscription.unlistened}{" "}
													unlistened audios
												</p>
											: <p className="author text-muted">
													All listened
												</p>}
									</NavLink>
								</li>
							)}
						</ul>
					</div>}
		</div>
	);
};

SuscriptionsList.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			suscription_id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired
		})
	)
};

export default SuscriptionsList;
