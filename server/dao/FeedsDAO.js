var db = require("../db");

var Feeds = Feeds || {};

Feeds.readFeedDetailsFromId = function(feedId) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Ejecucuón de la query
		db.query(
			"SELECT feed_id, feed_title, feed_description, feed_author, feed_web_url, feed_xml_url,feed_image 'feed_image_url', feed_last_fetch " +
				"FROM feeds " +
				"WHERE feed_id = ?",
			feedId,
			function(err, rows, fields) {
				if (err) {
					reject(err);
				} else {
					resolve(rows[0]);
				}
			}
		);
	});
};

Feeds.readFeedDetailsFromUrl = function(xmlUrl) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Ejecucuón de la query
		db.query(
			"SELECT feed_id, feed_title, feed_description, feed_author, feed_web_url, feed_xml_url,feed_image 'feed_image_url', feed_last_fetch " +
				"FROM feeds " +
				"WHERE feed_xml_url = ?",
			xmlUrl,
			function(err, rows, fields) {
				if (err) {
					reject(err);
				} else {
					resolve(rows[0]);
				}
			}
		);
	});
};

Feeds.readFeedAudios = function(userEmail, feedId, pagOptions) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		// Valores a sustituir en la query
		var values = [userEmail, feedId];
		// Query
		var query =
			"SELECT audio_id, audio_title, audio_url, audio_pubdate, lis.listen_status, lis.listen_time " +
			"FROM adi.feeds feeds, " +
			"adi.audios aud " +
			"LEFT OUTER JOIN adi.listen lis " +
			"ON lis.listen_audio_id = aud.audio_id " +
			"AND lis.listen_user_id = (SELECT user_id FROM adi.users us WHERE us.user_email = ?) " +
			"WHERE feeds.feed_id = aud.audio_feed " +
			"AND feeds.feed_id = ? ";

		// Páginación
		if (pagOptions.lastId) {
			query += "AND aud.audio_id < ? ";
			values.push(pagOptions.lastId);
		}
		// Orden
		query += "ORDER BY aud.audio_pubdate DESC ";
		// Limite
		if (pagOptions.limit) {
			query += " LIMIT " + pagOptions.limit + " ";
		}

		db.query(query, values, function(err, rows, fields) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

/* ##### Los sisguientes métodos son usados de forma interna por el "observer". No tienen acceso desde API ##### */
Feeds.getAllFeeds = function(callbackOk, callbackError) {
	db.query(
		"SELECT feed_id, feed_title 'title', feed_web_url 'web_url', feed_xml_url 'xml_url', feed_last_fetch 'last_fecth', feed_last_guid 'last_guid' " +
			"FROM feeds fds ",
		function(err, rows, fields) {
			if (err) {
				callbackError(err);
			} else {
				callbackOk(rows);
			}
		}
	);
};

Feeds.createFeed = function(feedInfo) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		var values = [
			feedInfo.title,
			feedInfo.description,
			feedInfo.author,
			feedInfo.image,
			feedInfo.web_url,
			feedInfo.xml_url,
			feedInfo.lastGuid || "",
			feedInfo.feed_last_fetch || ""
		];
		// Ejecucuón de la query
		db.query(
			"INSERT INTO adi.feeds (feed_title, feed_description, feed_author, feed_image, feed_web_url, feed_xml_url, feed_last_guid, feed_last_fetch) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
			values,
			function(err, rows, fields) {
				if (err) {
					reject(err);
				} else {
					resolve(rows.insertId);
				}
			}
		);
	});
};

Feeds.addAudiosToFeed = function(feedId, list, callbackOk, callbackError) {
	// Devolvemos una promesa
	return new Promise((resolve, reject) => {
		var insertValues = [];
		list.forEach(function(audio) {
			var audioValues = [
				feedId,
				audio.author,
				audio.origlink,
				audio.title,
				audio.description,
				audio.media_url,
				audio.guid,
				audio.pubDate,
				audio.pubDate
			];
			insertValues.push(audioValues);
		}, this);

		db.query(
			"INSERT INTO audios (audio_feed, audio_author, audio_origlink, audio_title, audio_content, audio_url, audio_guid, audio_pubdate, audio_fetchdate) " +
				"VALUES ?",
			[insertValues],
			function(err, rows, result) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
};

Feeds.updateInfo = function(feedId, newInfo) {
	var values = [
		newInfo.title,
		newInfo.description,
		newInfo.author,
		newInfo.image,
		newInfo.web_url,
		newInfo.xml_url,
		newInfo.lastGuid || "",
		newInfo.feed_last_fetch || "",
		feedId
	];

	db.query(
		"UPDATE feeds SET feed_title = ?, feed_description = ?, feed_author = ?, feed_image = ?, feed_web_url = ?, feed_xml_url = ?, feed_last_guid = ?, feed_last_fetch = ? WHERE feed_id = ?",
		values,
		function(err, result) {
			if (err) {
				console.err("Error: " + err);
			}
		}
	);
};

Feeds.resetAudios = function() {
	db.query("DELETE FROM audios", null, function(err, result) {
		if (err) {
			console.err("Error: " + err);
		}
	});
};

module.exports = Feeds;
