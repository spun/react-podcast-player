import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Componente que muestra una barra de navegación superiór
const NavBar = ({ userEmail }) => {
	return (
		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar bar1" />
						<span className="icon-bar bar2" />
						<span className="icon-bar bar3" />
					</button>
					<a className="navbar-brand" href="#">
						Dashboard
					</a>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav navbar-right">
						{/*Botón de añadir suscripción*/}
						<li>
							<Link to="/add">
								<i className="ti-plus" /> <p>Add suscription</p>
							</Link>
						</li>

						{/*Menú desplegable de ajustes*/}
						<li className="dropdown">
							<a
								href="#"
								className="dropdown-toggle"
								data-toggle="dropdown">
								<i className="ti-settings" /> <p>Settings</p>
								<b className="caret" />
							</a>
							<ul className="dropdown-menu">
								<li>
									<Link to="/account">My account</Link>
								</li>
								<li>
									<Link to="/about">About</Link>
								</li>
								<li role="separator" className="divider" />
								<li>
									<Link to="/logout">Logout</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
