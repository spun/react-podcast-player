import config from "../config";

// REcuperar todas las suscripciones del usuario
export function fetchSuscriptions() {
	return dispatch => {
		dispatch({ type: "FETCH_SUSCRIPTIONS_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + localStorage.userToken);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/suscriptions", {
			method: "GET",
			headers: myHeaders
		})
			.then(response => {
				return response.json();
			})
			.then(json => {
				return dispatch({
					type: "FETCH_SUSCRIPTIONS_FULFILLED",
					payload: json
				});
			})
			.catch(err => {
				return dispatch({
					type: "FETCH_SUSCRIPTIONS_REJECTED",
					payload: err
				});
			});
	};
}

// Eliminar una suscripción del usuario
export function deleteSuscription(feedId) {
	return dispatch => {
		dispatch({ type: "DELETE_SUSCRIPTION_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + localStorage.userToken);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/suscriptions/" + feedId, {
			method: "DELETE",
			headers: myHeaders
		})
			.then(response => {
				return dispatch({
					type: "DELETE_SUSCRIPTION_FULFILLED",
					payload: feedId
				});
			})
			.catch(err => {
				return dispatch({
					type: "DELETE_SUSCRIPTION_REJECTED",
					payload: err
				});
			});
	};
}

// Añadir una suscripción al usuario
export function addSuscription(feedId) {
	return dispatch => {
		dispatch({ type: "ADD_SUSCRIPTION_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + localStorage.userToken);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/suscriptions/" + feedId, {
			method: "PUT",
			headers: myHeaders
		})
			.then(response => {
				dispatch(fetchSuscriptions());

				return dispatch({
					type: "ADD_SUSCRIPTION_FULFILLED",
					payload: feedId
				});
			})
			.catch(err => {
				return dispatch({
					type: "ADD_SUSCRIPTION_REJECTED",
					payload: err
				});
			});
	};
}
