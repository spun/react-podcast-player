var express = require("express");
var bodyParser = require("body-parser");
var env = process.env;
var cors = require("cors");
var app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

//asociamos la URL "/web" con la carpeta "web"
app.use("/web", express.static("../client/web"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

// RESTful
// Usuarios
require("./controllers/UsuarioController.js").usuario(app);
// Suscripciones
require("./controllers/SuscriptionsController.js").suscriptions(app);
// Audios
require("./controllers/AudiosController.js").audios(app);
// Feeds
require("./controllers/FeedsController.js").feeds(app);
// Discover
require("./controllers/DiscoverController.js").discover(app);

var observer = require("./observer");
// observer.start();

var port = env.NODE_PORT || 3000;
var ip = env.NODE_IP;
app.listen(port, ip, function() {
	console.info("Listening on port " + port + "...");
});

module.exports = app;
