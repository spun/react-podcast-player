var FeedsDAO = require("../dao/FeedsDAO");
var jwt = require("jwt-simple");
var moment = require("moment");
var conf = require("../config");
var observer = require("../observer");

var FeedsService = FeedsService || {};

FeedsService.getFeedDetails = function(token, feedId) {
	// No hay que realizar cambios a la respuesta de la BD.
	// Devolvemos la promesa que recibimos.
	return FeedsDAO.readFeedDetailsFromId(feedId);
};

FeedsService.getFeedUrlDetails = function(token, feedUrl) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var emailUsuario = decoded.login;

	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Comprobamos si existe un feed con esa url en la BD
		FeedsDAO.readFeedDetailsFromUrl(feedUrl)
			.then(result => {
				// Si obtenemos un resultado de la BD
				if (result) {
					// Resolvemos la promesa
					resolve(result);
				} else {
					// Si no existe en la BD, hacemos una petición
					// y guardamos en la BD
					observer
						.createFeed(feedUrl)
						.then(newFeedId => {
							// Una vez creado el feed en la BD,
							// lo intentamos recuperar de nuevo
							FeedsService.getFeedUrlDetails(token, feedUrl)
								.then(result => {
									if (result) {
										resolve(result);
									} else {
										throw "Bad url";
									}
								})
								.catch(err => reject(err));
						})
						.catch(err => reject(err));
				}
			})
			.then()
			.catch(err => reject(err));
	});
};

FeedsService.getFeedAudios = function(token, feedId, paginationOptions) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var emailUsuario = decoded.login;
	// Devolvemos la promesa que recibimos.
	return FeedsDAO.readFeedAudios(emailUsuario, feedId, paginationOptions);
};

/* ##### Los siguientes metodos son de uso interno por el "observer" y no tienen acceso desde API ##### */
FeedsService.getAllFeeds = function(callbackOk, callbackError) {
	FeedsDAO.getAllFeeds(callbackOk, callbackError);
};

FeedsService.updateInfo = function(feedId, newInfo) {
	FeedsDAO.updateInfo(feedId, newInfo);
};

FeedsService.resetAudios = function() {
	FeedsDAO.resetAudios();
};

module.exports = FeedsService;
