var SuscriptionsService = require("../services/SuscriptionsService");

exports.suscriptions = function(app) {
	// GET /api/suscriptions
	// Obtener las suscripciones del usuario
	app.get("/api/suscriptions", function(req, res, next) {
		var rawToken = req.headers["authorization"];
		if (rawToken) {
			var token = rawToken.split("Bearer ")[1];

			SuscriptionsService.getUserSuscriptions(
				token,
				function(results) {
					res.status(200);
					res.send(results);
				},
				function(err) {
					// Si ha fallado
					res.status(500);
					res.send({ error: err });
				}
			);
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "token no proporcionado" });
		}
	});

	// POST /api/suscriptions [mockup]
	// Añadir suscripción al usuario
	app.post("/api/suscriptions", function(req, res, next) {
		// Recibimos una url
		var feedURL = req.body["feedUrl"];

		var rawToken = req.headers["authorization"];

		if (rawToken && feedURL) {
			// Comprobamos si es una URL bien formada
			var regex = new RegExp(
				"^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
			);
			if (regex.test(feedURL)) {
				// Si es una URL correcta
				var token = rawToken.split("Bearer ")[1];

				SuscriptionsService.addSuscripction(
					token,
					feedURL,
					function() {
						res.status(201);
						res.send();
					},
					function(err) {
						// Si ha fallado
						res.status(500);
						res.send({ error: err });
					}
				);
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

	// DELETE /api/suscriptions/:feedId
	// Eliminar suscripción del feed al usuario
	app.delete("/api/suscriptions/:feedId", function(req, res, next) {
		// Comprobamos si el token y la id del feed aparecen en la petición
		var rawToken = req.headers["authorization"];
		var feedId = req.params.feedId;
		if (rawToken && feedId) {
			// Recuperamos el token
			var token = rawToken.split("Bearer ")[1];

			// Realizamos la petición al servicio adecuado
			SuscriptionsService.deleteSuscription(token, feedId)
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

	// PUT /api/suscriptions/:feedId
	// Añadir suscripción a un feed
	app.put("/api/suscriptions/:feedId", function(req, res, next) {
		// Comprobamos si el token y la id del feed aparecen en la petición
		var rawToken = req.headers["authorization"];
		var feedId = req.params.feedId;
		if (rawToken && feedId) {
			// Recuperamos el token
			var token = rawToken.split("Bearer ")[1];

			// Realizamos la petición al servicio adecuado
			SuscriptionsService.addSuscription(token, feedId)
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

	app.dele;
};
