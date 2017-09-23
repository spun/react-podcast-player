var token = localStorage.userToken;
import config from "../config";

// Recuperar los detalles de un podcast
export function fetchPodcastDetails(podcast) {
	return dispatch => {
		dispatch({ type: "FETCH_PODCAST_DETAILS_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/feeds/" + podcast, {
			method: "GET",
			headers: myHeaders
		})
			.then(response => {
				return response.json();
			})
			.then(json => {
				return dispatch({
					type: "FETCH_PODCAST_DETAILS_FULFILLED",
					payload: json
				});
			})
			.catch(err => {
				return dispatch({
					type: "FETCH_PODCAST_DETAILS_REJECTED",
					payload: err
				});
			});
	};
}

// Recuperar los audios de un podcast
export function fetchPodcastAudios(podcast) {
	return dispatch => {
		dispatch({ type: "FETCH_PODCAST_AUDIOS_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(
			config.apiUrl +
				"/api/feeds/" +
				podcast +
				"/audios?limit=" +
				config.audiosPage,
			{
				method: "GET",
				headers: myHeaders
			}
		)
			.then(response => {
				return response.json();
			})
			.then(json => {
				return dispatch({
					type: "FETCH_PODCAST_AUDIOS_FULFILLED",
					payload: json
				});
			})
			.catch(err => {
				return dispatch({
					type: "FETCH_PODCAST_AUDIOS_REJECTED",
					payload: err
				});
			});
	};
}

// Recuperar más audios de un podcast (páginación)
export function fetchPodcastNextAudios(podcast, fromAudioID) {
	return dispatch => {
		dispatch({ type: "FETCH_PODCAST_NEXT_AUDIOS_PENDING" });

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(
			config.apiUrl +
				"/api/feeds/" +
				podcast +
				"/audios?limit=" +
				config.audiosPage +
				"&lastId=" +
				fromAudioID,
			{ method: "GET", headers: myHeaders }
		)
			.then(response => {
				return response.json();
			})
			.then(json => {
				return dispatch({
					type: "FETCH_PODCAST_NEXT_AUDIOS_FULFILLED",
					payload: json
				});
			})
			.catch(err => {
				return dispatch({
					type: "FETCH_PODCAST_NEXT_AUDIOS_REJECTED",
					payload: err
				});
			});
	};
}
