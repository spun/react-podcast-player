var UsuarioDAO = require("../dao/UsuarioDAO");
var jwt = require("jwt-simple");
var moment = require("moment");
var conf = require("../config");

var UsuarioService = UsuarioService || {};

UsuarioService.crear = function(name, pass, callbackOk, callbackError) {
	UsuarioDAO.crear(
		name,
		pass,
		function() {
			UsuarioService.generarToken(name, pass, callbackOk, callbackError);
		},
		callbackError
	);
};

UsuarioService.generarToken = function(name, pass, callbackOk, callbackError) {
	UsuarioDAO.buscarUsuario(
		name,
		pass,
		function(rows) {
			if (rows.length == 1) {
				var payload = {
					login: name,
					exp: moment().add(conf.jwtconfig.expire, "days").valueOf()
				};

				var token = jwt.encode(payload, conf.jwtconfig.secret);
				callbackOk(token);
			} else {
				callbackError("No se ha encontrado el usuario");
			}
		},
		callbackError
	);
};

UsuarioService.borrar = function(token, callbackOk, callbackError) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var loginUsuario = decoded.login;

	UsuarioDAO.borrar(loginUsuario, callbackOk, callbackError);
};

UsuarioService.editar = function(
	token,
	nuevoUsuario,
	nuevoPass,
	callbackOk,
	callbackError
) {
	var decoded = jwt.decode(token, conf.jwtconfig.secret);
	var loginUsuario = decoded.login;

	UsuarioDAO.editar(
		loginUsuario,
		nuevoUsuario,
		nuevoPass,
		callbackOk,
		callbackError
	);
};

module.exports = UsuarioService;
