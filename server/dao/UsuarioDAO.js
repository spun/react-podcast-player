var db = require("../db");

var Users = Users || {};

// Crea un nuevo usuario en la BD
Users.crear = function(name, password, callbackOk, callbackError) {
	var values = [name, password];

	db.query(
		"INSERT INTO users (user_email, user_pass) VALUES(?, ?)",
		values,
		function(err, result) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk();
			}
		}
	);
};

// Busca un usuario en la BD
Users.buscarUsuario = function(name, password, callbackOk, callbackError) {
	var values = [name, password];

	db.query(
		"SELECT * FROM users WHERE user_email = ? AND user_pass = ?",
		values,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk(rows);
			}
		}
	);
};

// Borra un usuario de la BD
Users.borrar = function(emailUsuario, callbackOk, callbackError) {
	db.query("DELETE FROM users WHERE user_email = ?", emailUsuario, function(
		err,
		rows,
		fields
	) {
		if (err) {
			callbackError(err);
		} else {
			callbackOk(rows);
		}
	});
};

// Edita un usuario de la BD
Users.editar = function(
	emailUsuario,
	nuevoEmail,
	nuevoPass,
	callbackOk,
	callbackError
) {
	var values = [nuevoEmail, nuevoPass, emailUsuario];

	db.query(
		"UPDATE users SET user_email = ?, user_pass = ? WHERE user_email = ?;",
		values,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk(rows);
			}
		}
	);
};

module.exports = Users;
