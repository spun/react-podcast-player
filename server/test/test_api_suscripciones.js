var hola_express = require("../index");
var supertest = require("supertest");
var testUtils = require("./test_utils");

var tokenRaw = testUtils.generateTestToken("testUser");
var tokenTest = "Bearer " + tokenRaw;

describe("Test de la api de Suscripciones", function() {
	it("GET /api/suscriptions devuelve las suscripciones del usuario", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.get("/api/suscriptions")
			// Token
			.set("Authorization", tokenTest)
			// Verificamos el status HTTP
			.expect(200)
			// Como esta ya es la última expectativa, pasamos el 'done'.
			.end(function(err, res) {
				if (err) throw "Error en la consulta";
				// La respuesta devuelta es un array
				if (!res.body instanceof Array) throw "No es un array";
				done();
			});
	});

	it("GET /api/suscriptions/1/audios devuelve los audios de una suscripción", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.get("/api/suscriptions")
			// Token
			.set("Authorization", tokenTest)
			// Verificamos el status HTTP
			.expect(200)
			// Como esta ya es la última expectativa, pasamos el 'done'.
			.end(function(err, res) {
				if (err) throw "Error en la consulta";
				// La respuesta devuelta es un array
				if (!res.body instanceof Array) throw "No es un array";
				done();
			});
	});

	it("POST /api/suscriptions añade una suscripción al usuario a partir de una url", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.post("/api/suscriptions")
			// Token
			.set("Authorization", tokenTest)
			// Feed url
			.send({
				feedUrl:
					"http://www.ivoox.com/podcast-la-orbita-de-endor_fg_f113302_filtro_1.xml"
			})
			// Verificamos el status HTTP
			.expect(201, done);
	});

	it("POST /api/suscriptions intenta añadir una suscripción a partir de una url invalida", function(
		done
	) {
		// Al objeto supertest le pasamos la app de Express
		supertest(hola_express)
			// Hacemos una petición POST
			.post("/api/suscriptions")
			// Token
			.set("Authorization", tokenTest)
			// Feed url
			.send({ feedUrl: "badURL" })
			// Verificamos el status HTTP
			.expect(400, done);
	});
});
