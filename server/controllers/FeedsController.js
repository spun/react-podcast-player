var FeedsService = require("../services/FeedsService");

exports.feeds = function(app) {
	// GET /api/feeds
	// Obtener información sobre un feed/podcast
	app.get("/api/feeds/:feedId", function(req, res, next) {
		// Comprobamos si el token y la id del feed aparecen en la petición
		var rawToken = req.headers["authorization"];
		var feedId = req.params.feedId;
		if (rawToken && feedId) {
			// Recuperamos el token
			var token = rawToken.split("Bearer ")[1];

			// Realizamos la petición al servicio adecuado
			FeedsService.getFeedDetails(token, feedId)
				.then(results => {
					res.status(200);
					res.send(results);
				})
				.catch(err => {
					// Si ha fallado
					res.status(500);
					res.send({ error: err });
				});
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "token no proporcionado" });
		}
	});

	// POST /api/suscriptions [mockup]
	// Obtener información sobre un feed/podcast desde su url
	app.post("/api/feeds", function(req, res, next) {
		// Recibimos una url
		var feedURL = req.body["feedUrl"];
		// Comprobamos si el token y la id del feed aparecen en la petición
		var rawToken = req.headers["authorization"];
		if (rawToken && feedURL) {
			// Comprobamos si es una URL bien formada
			var regex = new RegExp(
				"^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
			);
			if (regex.test(feedURL)) {
				// Si es una URL correcta
				var token = rawToken.split("Bearer ")[1];

				FeedsService.getFeedUrlDetails(token, feedURL)
					.then(result => {
						res.status(200);
						res.send(result);
					})
					.catch(err => {
						res.status(500);
						res.send({ error: err });
					});
			} else {
				// Si no es una URL valida
				res.status(400);
				res.send({ error: "feedUrl no valida" });
			}
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "la petición no está bien formada" });
		}
	});

	// GET /api/feeds/:feedId/audios
	// Obtener los audios de un feed/podcast
	app.get("/api/feeds/:feedId/audios", function(req, res, next) {
		// Paginación
		var paginationOptions = {
			// Limite de resultados que queremos obtener
			limit: req.query.limit,
			// Valor de la la útlima id que recibimos y
			// a partir de la cual queremos resultados en esta consulta
			lastId: req.query.lastId
		};

		// Comprobamos si el token y la id del feed aparecen en la petición
		var rawToken = req.headers["authorization"];
		var feedId = req.params.feedId;
		if (rawToken && feedId) {
			// Recuperamos el token
			var token = rawToken.split("Bearer ")[1];

			// Realizamos la petición al servicio adecuado
			FeedsService.getFeedAudios(token, feedId, paginationOptions)
				.then(results => {
					res.status(200);
					res.send(results);
				})
				.catch(err => {
					// Si ha fallado
					res.status(500);
					res.send({ error: err });
				});
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "token no proporcionado" });
		}
	});
};
