var SuscriptionsDAO = require("../dao/SuscriptionsDAO");
var jwt = require("jwt-simple");
var moment = require("moment");
var conf = require("../config");

var SuscriptionsService = SuscriptionsService || {};

SuscriptionsService.getUserSuscriptions = function(
	token,
	callbackOk,
	callbackError
) {
	// Recuperamos el email del usuario a partir del token
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var emailUsuario = decoded.login;

	SuscriptionsDAO.getUserSuscriptions(
		emailUsuario,
		callbackOk,
		callbackError
	);
};

SuscriptionsService.deleteSuscription = function(token, feedId) {
	// Recuperamos el email del usuario a partir del token
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var emailUsuario = decoded.login;

	// Devolvemos la promesa que recibimos.
	return SuscriptionsDAO.deleteSuscription(emailUsuario, feedId);
};

SuscriptionsService.addSuscription = function(token, feedId) {
	// Recuperamos el email del usuario a partir del token
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var emailUsuario = decoded.login;

	// Devolvemos la promesa que recibimos.
	return SuscriptionsDAO.addSuscription(emailUsuario, feedId);
};

module.exports = SuscriptionsService;
