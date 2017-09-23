var AudiosService = require("../services/AudiosService");

exports.audios = function(app) {
	// GET /api/audios/:idAudio
	// Recuperar la información de un audio
	app.get("/api/audios/:idAudio", function(req, res, next) {
		var audioId = parseInt(req.params.idAudio);
		if (isNaN(audioId)) {
			res.status(400);
			res.end({ error: "id de audio no valida" });
		} else {
			AudiosService.getAudio(
				audioId,
				function(rows) {
					res.status(200);
					res.send(rows);
				},
				function(err) {
					// Si ha fallado la recuperación
					res.status(404);
					res.send({ error: err });
				}
			);
		}
	});

	// POST /api/audios/:idAudio/listen
	// Marcar un audio como escuchado
	app.post("/api/audios/:idAudio/listen", function(req, res, next) {
		var audioId = parseInt(req.params.idAudio);
		var rawToken = req.headers["authorization"];

		if (isNaN(audioId) || !rawToken) {
			res.status(400);
			res.end({ error: "datos no validos" });
		} else {
			var token = rawToken.split("Bearer ")[1];
			AudiosService.setAudioAsListened(
				token,
				audioId,
				function() {
					res.status(200);
					res.send();
				},
				function(err) {
					// Si ha fallado la recuperación
					res.status(404);
					res.send({ error: err });
				}
			);
		}
	});

	// DELETE /api/audios/:idAudio/listen
	// Eliminar un audio de la lista de escuchados
	app.delete("/api/audios/:idAudio/listen", function(req, res, next) {
		var audioId = parseInt(req.params.idAudio);
		var rawToken = req.headers["authorization"];
		if (isNaN(audioId) || !rawToken) {
			res.status(400);
			res.end({ error: "datos no validos" });
		} else {
			var token = rawToken.split("Bearer ")[1];

			AudiosService.setAudioAsUnlistened(
				token,
				audioId,
				function(rows) {
					res.status(200);
					res.send(rows);
				},
				function(err) {
					// Si ha fallado la recuperación
					res.status(404);
					res.send({ error: err });
				}
			);
		}
	});

	// PUT /api/audios/:idAudio/time/:timeValue
	// Guardar el progreso de escucha de un audio
	app.put("/api/audios/:idAudio/time/:timeValue", function(req, res, next) {
		var audioId = parseInt(req.params.idAudio);
		var timeValue = parseInt(req.params.timeValue);
		var rawToken = req.headers["authorization"];

		if (isNaN(audioId) || isNaN(timeValue) || !rawToken) {
			res.status(400);
			res.end({ error: "datos no validos" });
		} else {
			var token = rawToken.split("Bearer ")[1];

			AudiosService.setAudioProgress(
				token,
				audioId,
				timeValue,
				function(rows) {
					res.status(200);
					res.send(rows);
				},
				function(err) {
					// Si ha fallado la recuperación
					res.status(404);
					res.send({ error: err });
				}
			);
		}
	});
};
