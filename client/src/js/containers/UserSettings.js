import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Componente que muestra la página de perfil del usuario (to-do)
const UserSettings = ({ match, list, playAudio }) => {
	return (
		<div className="card">
			<div className="header">
				<h4 className="title">User settings</h4>
				<p className="category">Account details</p>
			</div>
			<div className="content">
				<h5 className="text-warning">TO-DO</h5>
				<p>User setting not yet implemented</p>
				<hr />
				<p>Toast test</p>
				{/* Botón de prueba para showToast("") */}
				<button
					className="btn btn-fill"
					onClick={() => showToast("demo")}>
					Show toast
				</button>
			</div>
		</div>
	);
};

export default UserSettings;
