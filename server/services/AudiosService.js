var AudiosDAO = require("../dao/AudiosDAO");
var jwt = require("jwt-simple");
var moment = require("moment");
var conf = require("../config");

var AudiosService = AudiosService || {};

AudiosService.getAudio = function(idAudio, callbackOk, callbackError) {
	AudiosDAO.getAudio(idAudio, callbackOk, callbackError);
};

AudiosService.setAudioAsListened = function(
	token,
	idAudio,
	callbackOk,
	callbackError
) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var loginUsuario = decoded.login;

	AudiosDAO.setAudioAsListened(
		loginUsuario,
		idAudio,
		callbackOk,
		callbackError
	);
};

AudiosService.setAudioAsUnlistened = function(
	token,
	idAudio,
	callbackOk,
	callbackError
) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var loginUsuario = decoded.login;

	AudiosDAO.setAudioAsUnlistened(
		loginUsuario,
		idAudio,
		callbackOk,
		callbackError
	);
};

AudiosService.setAudioProgress = function(
	token,
	idAudio,
	audioTime,
	callbackOk,
	callbackError
) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var loginUsuario = decoded.login;

	AudiosDAO.setAudioProgress(
		loginUsuario,
		idAudio,
		audioTime,
		callbackOk,
		callbackError
	);
};

module.exports = AudiosService;
