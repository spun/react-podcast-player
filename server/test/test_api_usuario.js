var hola_express = require("../index");
var supertest = require("supertest");

describe("Test de la api de Usuarios", function() {
	it("POST /registro intento cración de un usuario que ya existe", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.post("/registro")
			// Con los datos de un usuario que si que existe
			.send({ name: "testUser", password: "testPassword" })
			// Verificamos el status HTTP
			.expect(500, done);
	});

	var token;
	it("POST /login devuelve el token de usuario", function(done) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.post("/login")
			// Con los datos de un usuario que si que existe
			.send({ name: "testUser", password: "testPassword" })
			// Verificamos el status HTTP
			.expect(200)
			// Como esta ya es la última expectativa, pasamos el 'done'.
			.end(function(err, res) {
				if (err) throw err;
				if (!res.body.token) throw "No se ha recibido el token";
				done();
			});
	});

	it("DELETE /api/usuario intento de borrado sin proporcionar token", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición DELETE
			.delete("/api/usuario")
			// Verificamos el status HTTP (con falta de token)
			.expect(400, done);
	});

	it("PUT /api/usuario intento de edición sin proporcionar token", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición DELETE
			.put("/api/usuario")
			// Verificamos el status HTTP (con falta de token)
			.expect(400, done);
	});
});
