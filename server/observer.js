var request = require("request");
var FeedParser = require("feedparser");
var FeedsDao = require("./dao/FeedsDAO");

exports.createFeed = function(xmlUrl) {
	var fetchPromise = fetchFeed(xmlUrl);
	var createFeedPromise = fetchPromise.then(fetchResult => {
		return FeedsDao.createFeed(fetchResult.feedInfo);
	});

	return Promise.all([fetchPromise, createFeedPromise]).then(values => {
		const feedAudios = values[0].feedAudios;
		const newFeedId = values[1];

		return FeedsDao.addAudiosToFeed(newFeedId, feedAudios);
	});
};

/*
exports.start = function() {
	console.log("cast");

	// debug
	// FeedsService.resetAudios();

	FeedsService.getAllFeeds(
		function(results) {
			results.forEach(function(feed, index) {
				launchObserver(feed, index);
				console.log("INLINE", feed.xml_url);
			});
		},
		function(err) {
			// Si ha fallado
			console.log(err);
		}
	);
};

var launchObserver = function(feed, pos) {
	var launchTimeout = 10000 * pos;

	setTimeout(function() {
		console.log("Updating:", feed.title);
		fetchArticles(feed);
	}, launchTimeout);
};
*/
var fetchFeed = function(feedUrl) {
	return new Promise((resolve, reject) => {
		// Define our streams
		var req = request(feedUrl, { timeout: 10000, pool: false });
		req.setMaxListeners(50);
		// Some feeds do not respond without user-agent and accept headers.
		req.setHeader(
			"user-agent",
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"
		);
		req.setHeader("accept", "text/html,application/xhtml+xml");

		var feedparser = new FeedParser();

		// Define our handlers
		req.on("error", () => reject());
		req.on("response", function(res) {
			if (res.statusCode != 200)
				return this.emit("error", new Error("Bad status code"));
			var encoding = res.headers["content-encoding"] || "identity",
				charset = getParams(res.headers["content-type"] || "").charset;
			res = maybeDecompress(res, encoding);
			res = maybeTranslate(res, charset);
			res.pipe(feedparser);
		});

		// List of audios fetched
		var audios = [];

		feedparser.on("readable", function() {
			var post;
			while ((post = this.read())) {
				var audio = {
					author: post.author || "",
					origlink: post.origlink || post.link,
					title: post.title || "",
					description: post.description || "",
					guid: post.guid,
					pubDate:
						post.pubdate ||
						post.date ||
						post.meta.pubdate ||
						post.meta.date ||
						new Date(),
					media_url: post.enclosures[0].url,
					media_type: post.enclosures[0].type,
					media_length: post.enclosures[0].length
				};
				audios.unshift(audio);
			}
		});
		feedparser.on("error", () => reject());
		feedparser.on("end", function() {
			var newLastGuid = audios[0] ? audios[0].guid : null;

			// Feed info fetched from source
			var feedSourceInfo = {
				title: this.meta.title,
				description: this.meta.description,
				author: this.meta.author,
				image: null,
				web_url: this.meta.link || "",
				xml_url: feedUrl || this.meta.xmlurl || feedUrl,
				date: this.meta.date,
				pubdate: this.meta.pubdate,
				lastGuid: newLastGuid
			};

			if (this.meta.image && this.meta.image.url) {
				feedSourceInfo.image = this.meta.image.url;
			}

			resolve({
				feedInfo: feedSourceInfo,
				feedAudios: audios
			});
		});
	});
};
/*
var fetchArticles = function(feed) {
	var feedUrl = feed.xml_url;
	var feedId = feed.feed_id;
	var feedLastGuid = feed.last_guid;

	// Define our streams
	var req = request(feedUrl, { timeout: 10000, pool: false });
	req.setMaxListeners(50);
	// Some feeds do not respond without user-agent and accept headers.
	req.setHeader(
		"user-agent",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"
	);
	req.setHeader("accept", "text/html,application/xhtml+xml");

	var feedparser = new FeedParser();

	// Define our handlers
	req.on("error", done);
	req.on("response", function(res) {
		if (res.statusCode != 200)
			return this.emit("error", new Error("Bad status code"));
		var encoding = res.headers["content-encoding"] || "identity",
			charset = getParams(res.headers["content-type"] || "").charset;
		res = maybeDecompress(res, encoding);
		res = maybeTranslate(res, charset);
		res.pipe(feedparser);
	});

	// List of audios fetched
	var audios = [];

	feedparser.on("readable", function() {
		var post;
		while ((post = this.read())) {
			var audio = {
				author: post.author || "",
				origlink: post.origlink || post.link,
				title: post.title || "",
				description: post.description || "",
				guid: post.guid,
				pubDate:
					post.pubdate ||
					post.date ||
					post.meta.pubdate ||
					post.meta.date ||
					new Date(),
				media_url: post.enclosures[0].url,
				media_type: post.enclosures[0].type,
				media_length: post.enclosures[0].length
			};
			audios.unshift(audio);
		}
	});

	feedparser.on("error", done);

	feedparser.on("end", function() {
		var newLastGuid = audios[0].guid;

		var stopguid = feedLastGuid;
		var numAudios = audios.length;
		var lastGuidFound = false;
		var lastGuidPosition = 0;

		for (var i = 0; i < numAudios && lastGuidFound == false; i++) {
			var audio = audios[i];

			// Stop on audios we already have
			if (audio.guid == stopguid) {
				lastGuidFound = true;
				lastGuidPosition = i;
			}
		}

		// Remove from array the audios we already have
		if (lastGuidFound) {
			audios.splice(lastGuidPosition);
		}

		if (audios.length > 0) {
			FeedsService.addAudiosToFeed(feedId, audios);
		}

		// Feed info fetched from source
		var feedSourceInfo = {
			title: this.meta.title,
			description: this.meta.description,
			author: this.meta.author,
			image: null,
			web_url: this.meta.link || feed.web_url,
			xml_url: this.meta.xmlurl || feed.xml_url,
			date: this.meta.date,
			pubdate: this.meta.pubdate,
			lastGuid: newLastGuid
		};

		if (this.meta.image && this.meta.image.url) {
			feedSourceInfo.image = this.meta.image.url;
		}

		FeedsService.updateInfo(feedId, feedSourceInfo);
	});
};
*/
function maybeDecompress(res, encoding) {
	var decompress;
	if (encoding.match(/\bdeflate\b/)) {
		decompress = zlib.createInflate();
	} else if (encoding.match(/\bgzip\b/)) {
		decompress = zlib.createGunzip();
	}
	return decompress ? res.pipe(decompress) : res;
}

function maybeTranslate(res, charset) {
	var iconv;
	// Use iconv if its not utf8 already.
	if (!iconv && charset && !/utf-*8/i.test(charset)) {
		try {
			iconv = new Iconv(charset, "utf-8");
			console.log("Converting from charset %s to utf-8", charset);
			iconv.on("error", done);
			// If we're using iconv, stream will be the output of iconv
			// otherwise it will remain the output of request
			res = res.pipe(iconv);
		} catch (err) {
			res.emit("error", err);
		}
	}
	return res;
}

function getParams(str) {
	var params = str.split(";").reduce(function(params, param) {
		var parts = param.split("=").map(function(part) {
			return part.trim();
		});
		if (parts.length === 2) {
			params[parts[0]] = parts[1];
		}
		return params;
	}, {});
	return params;
}
