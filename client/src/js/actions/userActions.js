import config from "../config";

// Comprobar si hay un token de usuario guardado
export function checkLoggedUser() {
	if (localStorage.userToken) {
		return {
			type: "LOGIN_USER_FULFILLED",
			payload: {
				token: localStorage.userToken,
				email: "demo@user"
			}
		};
	} else {
		return {
			type: "LOGIN_USER_REJECTED",
			payload: null
		};
	}
}

// Entrada de usuario a la aplicación
export function loginUser(userEmail, userPassword) {
	return dispatch => {
		dispatch({ type: "LOGIN_USER_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		// Petición al servidor
		return fetch(config.apiUrl + "/login", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({ name: userEmail, password: userPassword })
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				return response.json();
			})
			.then(json => {
				localStorage.userToken = json.token;

				return dispatch({
					type: "LOGIN_USER_FULFILLED",
					payload: {
						token: json.token,
						name: userEmail
					}
				});
			})
			.catch(err => {
				return dispatch({ type: "LOGIN_USER_REJECTED", payload: err });
			});
	};
}

// Salida de usuario de la aplicación
export function logoutUser() {
	localStorage.removeItem("userToken");

	return {
		type: "LOGOUT_USER"
	};
}

// Creación de un nuevo usuario
export function createUser(userEmail, userPassword) {
	return dispatch => {
		dispatch({ type: "ADD_USER_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		// Petición al servidor
		return fetch(config.apiUrl + "/registro", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({ name: userEmail, password: userPassword })
		})
			.then(response => {
				console.log(response);
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(json => {
				console.log(json);
				localStorage.userToken = json.token;

				return dispatch({
					type: "LOGIN_USER_FULFILLED",
					payload: {
						token: json.token,
						name: userEmail
					}
				});
			})
			.catch(err => {
				return dispatch({ type: "LOGIN_USER_REJECTED", payload: err });
			});
	};
}

export function fetchUser() {
	return {
		type: "FETCH_USER_FULFILLED",
		payload: {
			name: "Will",
			age: 35
		}
	};
}

export function setUserName(name) {
	return {
		type: "SET_USER_NAME",
		payload: name
	};
}

export function setUserAge(age) {
	return {
		type: "SET_USER_AGE",
		payload: age
	};
}
