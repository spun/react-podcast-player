var db = require("../db");

var Audios = Audios || {};

Audios.getAudio = function(audioID, callbackOk, callbackError) {
	db.query(
		"SELECT * " + "FROM audios " + "WHERE audio_id = ?",
		audioID,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk(rows[0]);
			}
		}
	);
};

Audios.setAudioAsUnlistened = function(
	emailUsuario,
	audioID,
	callbackOk,
	callbackError
) {
	var values = [audioID, emailUsuario];

	db.query(
		"INSERT INTO listen (listen_user_id, listen_audio_id, listen_status) " +
			"SELECT user_id, ?, 'pending' FROM users WHERE user_email = ? " +
			"ON DUPLICATE KEY UPDATE listen_status = 'complete'",
		values,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk();
			}
		}
	);
};

Audios.setAudioAsListened = function(
	emailUsuario,
	audioID,
	callbackOk,
	callbackError
) {
	db.query(
		"SELECT user_id FROM users WHERE user_email = ?",
		emailUsuario,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				if (rows.length == 1) {
					var userID = rows[0]["user_id"];

					db.query(
						"DELETE FROM listen " +
							"WHERE listen_user_id = ? " +
							"AND listen_audio_id = ?",
						[userID, audioID],
						function(err, rows, fields) {
							if (err) {
								callbackError(err);
							} else {
								callbackOk(rows[0]);
							}
						}
					);
				}
			}
		}
	);
};

Audios.setAudioProgress = function(
	emailUsuario,
	audioID,
	listenTime,
	callbackOk,
	callbackError
) {
	var values = [audioID, listenTime, emailUsuario, listenTime];

	db.query(
		"INSERT INTO listen (listen_user_id, listen_audio_id, listen_status, listen_time) " +
			"SELECT user_id, ?, 'inProgress', ? FROM users WHERE user_email = ? " +
			"ON DUPLICATE KEY UPDATE listen_status = 'inProgress', listen_time = ?",
		values,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk();
			}
		}
	);
};

module.exports = Audios;
