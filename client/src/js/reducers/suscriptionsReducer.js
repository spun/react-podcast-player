export default function reducer(
	state = {
		suscriptions: [],
		fetching: false,
		fetched: false,
		error: null,
		selectedSuscriptions: {}
	},
	action
) {
	switch (action.type) {
		// Inicio de petición de las suscripciones del usuario
		case "FETCH_SUSCRIPTIONS_PENDING": {
			return Object.assign({}, state, {
				fetching: true
			});
		}
		// Petición de las suscripciones del usuario fallida
		case "FETCH_SUSCRIPTIONS_REJECTED": {
			showToast("An error ocurred while fetching your suscriptions.");
			return Object.assign({}, state, {
				fetching: false,
				fetched: false,
				error: action.payload
			});
		}
		// Petición de las suscripciones del usuario completada
		case "FETCH_SUSCRIPTIONS_FULFILLED": {
			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				suscriptions: action.payload
			});
		}

		// Inicio de petición de eliminar suscripción
		case "DELETE_SUSCRIPTION_PENDING": {
			return Object.assign({}, state, {
				fetching: true
			});
		}
		// Petición de eliminar suscripción fallida
		case "DELETE_SUSCRIPTION_REJECTED": {
			showToast("An error ocurred at unsuscribe.");
			return Object.assign({}, state, {
				fetching: false,
				fetched: false,
				error: action.payload
			});
		}
		// Petición de eliminar suscripción completada
		case "DELETE_SUSCRIPTION_FULFILLED": {
			var newSuscriptionsList = state.suscriptions.filter(
				suscription => suscription.feed_id != action.payload
			);

			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				suscriptions: newSuscriptionsList
			});
		}
		// Añadir suscripciones provoca una petición completa de las suscripciones
		// del usuario para tener la nueva id de la suscripión, por tanto no hace
		// falta escuchar esos eventos
	}
	return state;
}
