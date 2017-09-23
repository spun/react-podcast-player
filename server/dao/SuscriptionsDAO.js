var db = require("../db");

var Suscriptions = Suscriptions || {};

Suscriptions.getUserSuscriptions = function(
	userName,
	callbackOk,
	callbackError
) {
	db.query(
		"SELECT sub_id suscription_id, feed_id, feed_title 'title', feed_image 'image_url', count(audio_id) 'unlistened' " +
			"FROM users us, suscriptions sub, feeds " +
			"LEFT OUTER JOIN audios " +
			"ON audios.audio_feed = feeds.feed_id " +
			"AND audios.audio_id IN (SELECT listen.listen_audio_id FROM listen WHERE listen.listen_status = 'pending') " +
			"WHERE us.user_id = sub.sub_user_id " +
			"AND sub.sub_feed_id = feeds.feed_id " +
			"AND us.user_email = ? " +
			"GROUP BY suscription_id, feed_id, title, image_url",
		userName,
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk(rows);
			}
		}
	);
};

Suscriptions.deleteSuscription = function(userEmail, feedId) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Valores a sustituir en la query
		var values = [feedId, userEmail];
		// Ejecucuón de la query
		db.query(
			"DELETE FROM suscriptions " +
				"WHERE sub_feed_id = ? " +
				"AND sub_user_id = (SELECT user_id FROM users WHERE user_email = ?) ",
			values,
			function(err, rows, fields) {
				if (err) {
					reject(err);
				} else {
					if (rows.affectedRows == 1) {
						resolve();
					} else {
						reject("Incorrect number of affected rows");
					}
				}
			}
		);
	});
};

Suscriptions.addSuscription = function(userEmail, feedId) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Valores a sustituir en la query
		var values = [userEmail, feedId];
		// Ejecucuón de la query
		db.query(
			"INSERT INTO suscriptions (sub_user_id, sub_feed_id, sub_feed_rename) " +
				"VALUES ((SELECT user_id FROM users WHERE user_email = ?), ?, '') ",
			values,
			function(err, rows, fields) {
				if (err) {
					reject(err);
				} else {
					if (rows.affectedRows == 1) {
						resolve();
					} else {
						reject("Incorrect number of affected rows");
					}
				}
			}
		);
	});
};

module.exports = Suscriptions;
