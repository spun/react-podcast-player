var DiscoverService = require('../services/DiscoverService');

exports.discover = function(app) {

    // GET /api/discover/new
    // Podcast recien añadidos
    app.get('/api/discover/new', function(req, res, next) {
        res.status(501);                
        res.send({"error": "Not Implemented"}); 
    });


    // GET /api/discover/trending
    // Podcast de exito
    app.get('/api/discover/trending', function(req, res, next) {
        res.status(501);                
        res.send({"error": "Not Implemented"}); 
    });


    // GET (¿POST?) /api/discover/search/:searchText
    // Búsqueda de podcasts
    app.get('/api/discover/search/:searchText', function(req, res, next) {

        var searchText = req.params.searchText;
        if (!searchText) {
            res.status(400);
            res.end({"error": "texto de busqueda no valido"});

        } else {
            DiscoverService.searchPodcast(searchText, function(rows) {
                res.status(200);    
                res.send(rows);
            }, function(err) {
                // Si ha fallado la recuperación
                res.status(404);                
                res.send({"error": err}); 
            });
        }
    });
};
