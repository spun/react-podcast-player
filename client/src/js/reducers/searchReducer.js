export default function reducer(
	state = {
		searchResult: null,
		fetching: false,
		fetched: false,
		error: null
	},
	action
) {
	switch (action.type) {
		// Inicio de petición de detalles de una url de podcast
		case "SEARCH_PODCAST_URL_PENDING": {
			return Object.assign({}, state, {
				searchResult: null,
				fetching: true,
				fetched: false
			});
		}
		// Petición de detalles de una url de podcast fallida
		case "SEARCH_PODCAST_URL_REJECTED": {
			showToast("An error ocurred feching podcast.");
			return Object.assign({}, state, {
				fetched: false,
				fetching: false,
				error: action.payload
			});
		}
		// Petición de detalles de una url de podcast completada
		case "SEARCH_PODCAST_URL_FULFILLED": {
			return Object.assign({}, state, {
				fetching: false,
				fetched: true,
				searchResult: action.payload
			});
		}
	}
	return state;
}
