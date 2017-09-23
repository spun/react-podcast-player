var hola_express = require("../index");
var supertest = require("supertest");
var testUtils = require("./test_utils");

var tokenRaw = testUtils.generateTestToken("testUser");
var tokenTest = "Bearer " + tokenRaw;

describe("Test de la api de Audios", function() {
	it("GET /api/audios/:idAudio devuelve un audio a partir de la id", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición GET
			.get("/api/audios/1")
			// Verificamos el status HTTP
			.expect(200)
			// Como esta ya es la última expectativa, pasamos el 'done'.
			.end(function(err, res) {
				if (err) throw "Error en la consulta";
				// La respuesta devuelta no es un objeto
				if (res.body !== Object(res.body))
					throw "No se ha recibido el token";
				done();
			});
	});

	it("POST /api/audios/:idAudio/listen marca un audio como escuchado", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición GET
			.post("/api/audios/3/listen")
			// Token
			.set("Authorization", tokenTest)
			// Verificamos el status HTTP
			.expect(200, done);
	});

	it("DELETE /api/audios/:idAudio/listen marca un audio no como escuchado", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición GET
			.delete("/api/audios/3/listen")
			// Token
			.set("Authorization", tokenTest)
			// Verificamos el status HTTP
			.expect(200, done);
	});

	it("PUT /api/audios/:idAudio/time/:timeValue guarda el progreso de escucha de un audio", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición GET
			.put("/api/audios/3/time/3000")
			// Token
			.set("Authorization", tokenTest)
			// Verificamos el status HTTP
			.expect(200, done);
	});
});
