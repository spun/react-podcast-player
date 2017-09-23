export default function reducer(
	state = {
		// Audios podcast
		audiosFeed: null,
		audios: [],
		fetchingAudios: false,
		fetchedAudios: false,
		errorAudios: null
	},
	action
) {
	switch (action.type) {
		// Inicio de petición de audios de un podcast
		case "FETCH_PODCAST_AUDIOS_PENDING": {
			return Object.assign({}, state, {
				fetchingAudios: true,
				fetchedAudios: false
			});
		}
		// Petición de audios de un podcast fallida
		case "FETCH_PODCAST_AUDIOS_REJECTED": {
			showToast("An error ocurred feching the list of audios.");
			return Object.assign({}, state, {
				fetchingAudios: false,
				errorAudios: action.payload
			});
		}
		// Petición de audios de un podcast completada
		case "FETCH_PODCAST_AUDIOS_FULFILLED": {
			return Object.assign({}, state, {
				fetchingAudios: false,
				fetchedAudios: true,
				audios: action.payload
			});
		}

		// Inicio de petición de más audios de un podcast (paginación)
		case "FETCH_PODCAST_NEXT_AUDIOS_PENDING": {
			return Object.assign({}, state, {
				fetchingAudios: true,
				fetchedAudios: false
			});
		}
		// Petición de más audios de un podcast fallida
		case "FETCH_PODCAST_NEXT_AUDIOS_REJECTED": {
			showToast("An error ocurred feching the list of audios.");
			return Object.assign({}, state, {
				fetchingAudios: false,
				errorAudios: action.payload
			});
		}
		// Petición de más audios de un podcast completada
		case "FETCH_PODCAST_NEXT_AUDIOS_FULFILLED": {
			return Object.assign({}, state, {
				fetchingAudios: false,
				fetchedAudios: true,
				audios: state.audios.concat(action.payload)
			});
		}
		// Marcar audio como pendiente de escucha
		case "MARK_AUDIO_AS_PENDING": {
			var audiosCopy = state.audios.slice();
			audiosCopy.forEach(audio => {
				if (audio.audio_id == action.payload) {
					audio.listen_status = "pending";
					audio.listen_time = 0;
				}
			});

			return Object.assign({}, state, {
				audios: audiosCopy
			});
		}
		// Marcar audio como escuchado
		case "MARK_AUDIO_AS_LISTENED": {
			var audiosCopy = state.audios.slice();
			audiosCopy.forEach(audio => {
				if (audio.audio_id == action.payload) {
					audio.listen_status = null;
					audio.listen_time = 0;
				}
			});
			return Object.assign({}, state, {
				audios: audiosCopy
			});
		}
	}

	return state;
}
