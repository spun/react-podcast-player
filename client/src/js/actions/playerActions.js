import { markAudioAsPending, markAudioAsListened } from "./audiosActions";

// Empezar a reproducir un audio
export function startAudio(audio, startFrom = 0) {
	return dispatch => {
		dispatch(markAudioAsPending(audio.audio_id));

		return dispatch({
			type: "PLAYER_START",
			payload: {
				audio: audio,
				startFrom: startFrom
			}
		});
	};
}

// Continuar con la reproducción del audio actual
export function resumeAudio() {
	return {
		type: "PLAYER_RESUME"
	};
}

// Pausar la reproducción del audio actual
export function pauseAudio() {
	return {
		type: "PLAYER_PAUSE"
	};
}

// La reproducción del audio ha terminado
export function endedAudio(audioId) {
	return dispatch => {
		dispatch(markAudioAsListened(audioId));

		return dispatch({
			type: "PLAYER_ENDED",
			payload: {
				audio: audioId
			}
		});
	};
}

// Cambiar el volumen del audios
export function changeVolume(volumeValue) {
	return {
		type: "PLAYER_CHANGE_VOLUME",
		payload: volumeValue
	};
}

// Cambiar tiempo de escucha del audio actual
export function changeProgress(progressValue) {
	return {
		type: "PLAYER_CHANGE_PROGRESS",
		payload: progressValue
	};
}

// Guardar la duración total del audio en reproducción
export function setDuration(durationValue) {
	return {
		type: "PLAYER_SET_DURATION",
		payload: durationValue
	};
}

// Cambiar el ritmo/velocidad de reproducción del audio
export function changePlaybackRate(playbackRateValue) {
	return {
		type: "PLAYER_CHANGE_PLAYBACK_RATE",
		payload: playbackRateValue
	};
}
