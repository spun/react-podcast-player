export default function reducer(
	state = {
		audio: {},
		isPlaying: false,
		volume: 100,
		duration: 0,
		progress: 0,
		playbackRate: 1
	},
	action
) {
	switch (action.type) {
		// Reproducir audio
		case "PLAYER_START": {
			return Object.assign({}, state, {
				audio: action.payload.audio,
				progress: action.payload.startFrom,
				isPlaying: true
			});
		}
		// Retomar audio
		case "PLAYER_RESUME": {
			return Object.assign({}, state, {
				isPlaying: true
			});
		}
		// Pausar audio
		case "PLAYER_PAUSE": {
			return Object.assign({}, state, {
				isPlaying: false
			});
		}
		// Audio terminado
		case "PLAYER_ENDED": {
			return Object.assign({}, state, {
				isPlaying: false,
				audio: {},
				duration: 0,
				progress: 0
			});
		}
		// Cambiar volumen
		case "PLAYER_CHANGE_VOLUME": {
			return Object.assign({}, state, {
				volume: action.payload
			});
		}
		// Cambiar tiempo
		case "PLAYER_CHANGE_PROGRESS": {
			return Object.assign({}, state, {
				progress: action.payload
			});
		}
		// Guardar duración total
		case "PLAYER_SET_DURATION": {
			return Object.assign({}, state, {
				duration: action.payload
			});
		}
		// Cambiar velodidad de reproducción
		case "PLAYER_CHANGE_PLAYBACK_RATE": {
			return Object.assign({}, state, {
				playbackRate: action.payload
			});
		}
	}
	return state;
}
