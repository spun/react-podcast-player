var token = localStorage.userToken;
import config from "../config";

// Marcar un audio como pendiente de escucha
export function markAudioAsPending(audioId) {
	return dispatch => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/audios/" + audioId + "/listen", {
			method: "DELETE",
			headers: myHeaders
		})
			.then(response => {
				return dispatch({
					type: "MARK_AUDIO_AS_PENDING",
					payload: audioId
				});
			})
			.catch(err => {
				console.err(err);
			});
	};
}

// Marcar un audio como escuchado
export function markAudioAsListened(audioId) {
	return dispatch => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", "Bearer " + token);

		// Petición al servidor
		return fetch(config.apiUrl + "/api/audios/" + audioId + "/listen", {
			method: "POST",
			headers: myHeaders
		})
			.then(response => {
				return dispatch({
					type: "MARK_AUDIO_AS_LISTENED",
					payload: audioId
				});
			})
			.catch(err => {
				console.err(err);
			});
	};
}
