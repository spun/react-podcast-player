var token = localStorage.userToken;
import config from "../config";

// Recuperar los detalles de un podcast a partir de su url
export function searchPodcastFromUrl(podcastUrl) {
	return dispatch => {
		dispatch({ type: "SEARCH_PODCAST_URL_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/feeds", {
			method: "POST",
			body: JSON.stringify({ feedUrl: podcastUrl }),
			headers: myHeaders
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw response.statusText;
				}
			})
			.then(json => {
				return dispatch({
					type: "SEARCH_PODCAST_URL_FULFILLED",
					payload: json
				});
			})
			.catch(err => {
				return dispatch({
					type: "SEARCH_PODCAST_URL_REJECTED",
					payload: err
				});
			});
	};
}
