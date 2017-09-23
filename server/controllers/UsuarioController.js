var UsuarioService = require("../services/UsuarioService");

exports.usuario = function(app) {
	// POST /login
	// Busca un usuario de la aplicación y devuelve un token valido
	app.post("/login", function(req, res, next) {
		// Recogemos los valores
		var name = req.body.name;
		var password = req.body.password;

		// Comprobamos que existen los valores
		if (name && password) {
			// Usamos el servicio para añadirlo a la BD
			UsuarioService.generarToken(
				name,
				password,
				function(token) {
					// Si la recuperación ha ido correctamente
					res.send({ token: token });
				},
				function(err) {
					// Si ha fallado la recuperación
					res.status(404);
					res.send({ error: err });
				}
			);
		} else {
			// Si la petición no está bien formada
			res.status(400);
			res.send({ error: "el objeto no tiene los campos adecuados" });
		}
	});

	// POST /registro
	// Añade un nuevo usuario a la aplicación
	app.post("/registro", function(req, res, next) {
		// Recogemos los valores
		var name = req.body.name;
		var password = req.body.password;

		// Comprobamos que existen los valores
		if (name && password) {
			// Usamos el servicio para añadirlo a la BD
			UsuarioService.crear(
				name,
				password,
				function(token) {
					// Si la inserción ha ido correctamente
					res.status(201);
					res.send({ token: token });
				},
				function(err) {
					// Si ha fallado la inserción
					res.status(500);
					res.send({ error: err });
				}
			);
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "el objeto no tiene los campos adecuados" });
		}
	});

	// DELETE /api/usuario
	// Borra el usuario al que pertenece el token
	app.delete("/api/usuario", function(req, res, next) {
		// Recogemos el token
		var rawToken = req.headers["authorization"];
		if (rawToken) {
			var token = rawToken.split("Bearer ")[1];

			UsuarioService.borrar(
				token,
				function(end) {
					res.status(200);
					res.send();
				},
				function(err) {
					// Si ha fallado el borrado
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

	// PUT /api/usuario
	// Edita el usuario al que pertenece el token
	app.put("/api/usuario", function(req, res, next) {
		// Recogemos los valores
		var name = req.body.name;
		var password = req.body.password;

		// Recogemos el token
		var rawToken = req.headers["authorization"];

		if (rawToken && name && password) {
			var token = rawToken.split("Bearer ")[1];

			UsuarioService.editar(
				token,
				name,
				password,
				function(end) {
					res.status(200);
					res.send();
				},
				function(err) {
					// Si ha fallado la edición
					res.status(500);
					res.send({ error: err });
				}
			);
		} else {
			// Si la peticón no está bien formada
			res.status(400);
			res.send({ error: "no se han proporcionado los datos adecuados" });
		}
	});
};
