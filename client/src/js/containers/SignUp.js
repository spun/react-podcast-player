import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { createUser } from "../actions/userActions";

// Componente del formulario de creación de usuario
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: "",
			userPassw: "",
			userPasswRepeat: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		// Update value on input
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const userEmail = this.state.userEmail;
		const userPassw = this.state.userPassw;

		this.props.handleCreateUser(userEmail, userPassw);
	}

	render() {
		const { userToken, userError } = this.props;

		// Show error if exists
		var errMsg = "";
		if (userError != null) {
			switch (userError.message) {
				case "Not Found":
					errMsg = "The specified user does not exist";
					break;
				// ...
				default:
					errMsg = "An error ocurred, please try again later";
			}
		}

		return (
			<div className="container-fluid registrationForm">
				{/* If there is already a token on store, redirect. To hard to do programmatically */}
				{userToken && <Redirect to={`/`} />}
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="card">
							<div className="header">
								<h4 className="title">Sign up</h4>
								<p className="category">
									Here is a subtitle for this table
								</p>
							</div>

							<div className="content">
								<form
									className="form-signin"
									onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Email</label>
												<input
													type="text"
													id="inputEmail"
													className="form-control border-input"
													name="userEmail"
													value={this.state.userEmail}
													onChange={
														this.handleInputChange
													}
													placeholder="Email address"
													autoFocus
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Password</label>
												<input
													type="password"
													id="inputPassword"
													className="form-control border-input"
													name="userPassw"
													value={this.state.userPassw}
													onChange={
														this.handleInputChange
													}
													placeholder="Password"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>Repeat password</label>
												<input
													type="password"
													id="inputPassword"
													className="form-control border-input"
													name="userPasswRepeat"
													value={
														this.state
															.userPasswRepeat
													}
													onChange={
														this.handleInputChange
													}
													placeholder="Password"
												/>
											</div>
										</div>
									</div>

									<p className="text-danger">
										{errMsg}
									</p>

									<div className="text-center">
										<button
											type="submit"
											className="btn btn-info btn-fill btn-wd">
											Sign up
										</button>
										<span> or </span>
										<Link to={`/login`}>Log In</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		userToken: store.user.token,
		userError: store.user.error
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleCreateUser: (email, passw) => {
			dispatch(createUser(email, passw));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
