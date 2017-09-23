export default function reducer(
	state = {
		// Podcast details
		podcastDetails: {},
		fetching: false,
		fetched: false,
		error: null
	},
	action
) {
	switch (action.type) {
		// Inicio de petición de detalles de un podcast
		case "FETCH_PODCAST_DETAILS_PENDING": {
			return Object.assign({}, state, {
				fetching: true,
				fetched: false
			});
		}
		// Petición de detalles de un podcast fallida
		case "FETCH_PODCAST_DETAILS_REJECTED": {
			showToast("An error ocurred feching the podcast details.");
			return Object.assign({}, state, {
				fetching: false,
				error: action.payload
			});
		}
		// Petición de detalles de un podcast completada
		case "FETCH_PODCAST_DETAILS_FULFILLED": {
			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				podcastDetails: action.payload
			});
		}
	}
	return state;
}
