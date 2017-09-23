export default function reducer(
	state = {
		token: null,
		email: null,
		fetching: false,
		fetched: false,
		error: null
	},
	action
) {
	switch (action.type) {
		// Inicio de petición de login
		case "LOGIN_USER_PENDING": {
			return Object.assign({}, state, {
				fetching: true
			});
		}
		// Petición de login fallida
		case "LOGIN_USER_REJECTED": {
			showToast("An error ocurred at login.");
			return Object.assign({}, state, {
				fetching: false,
				error: action.payload
			});
		}
		// Petición de login completada
		case "LOGIN_USER_FULFILLED": {
			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				email: "reducer@demo.com",
				token: action.payload.token
			});
		}
		// Salida de usuario
		case "LOGOUT_USER": {
			return Object.assign({}, state, {
				email: null,
				token: null
			});
		}
	}

	return state;
}
