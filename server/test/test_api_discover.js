var hola_express = require('../index');
var supertest = require('supertest');

describe('Test de la api de Descubrimiento', function() {

    it('GET /api/discover/new devuelve los últimos podcasts añadidos', function(done){
        // Al objeto supertest le pasamos la app de Express
        supertest(hola_express)
            // Hacemos una petición GET
            .get('/api/discover/new')
            // Verificamos el status HTTP
            .expect(501, done);
    });


    it('GET /api/discover/trending devuelve los podcasts de exito', function(done){
        // Al objeto supertest le pasamos la app de Express
        supertest(hola_express)
            // Hacemos una petición GET
            .get('/api/discover/trending')
            // Verificamos el status HTTP
            .expect(501, done);
    });


    it('GET /api/discover/search/:searchText busca podcast en una api externa', function(done){
        // Al objeto supertest le pasamos la app de Express
        supertest(hola_express)
            // Hacemos una petición GET
            .get('/api/discover/search/demo')
            // Verificamos el status HTTP
            .expect(200, done);
            
    }).timeout(10000);
});