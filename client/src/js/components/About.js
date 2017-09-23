import React from "react";
import PropTypes from "prop-types";

// Componente que muestra los creditos de la aplicación
const About = ({ list }) => {
	return (
		<div className="card">
			<div className="header">
				<h4 className="title">About this app</h4>
			</div>
			<div className="content">
				<h5>Libraries</h5>
				<ul>
					<li>
						<a
							href="https://facebook.github.io/react/"
							target="_blank">
							React
						</a>
					</li>
					<li>
						<a href="http://redux.js.org/" target="_blank">
							Redux
						</a>
					</li>
					<li>
						<a
							href="https://reacttraining.com/react-router/"
							target="_blank">
							React router
						</a>
					</li>
				</ul>

				<h5>Theme</h5>
				<ul>
					<li>
						<a
							href="https://www.creative-tim.com/product/paper-dashboard"
							target="_blank">
							Paper dashboard
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default About;
