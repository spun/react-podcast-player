var DiscoverDAO = require("../dao/DiscoverDAO");

var DiscoverService = DiscoverService || {};

DiscoverService.searchPodcast = function(
	searchText,
	callbackOk,
	callbackError
) {
	DiscoverDAO.searchPodcast(searchText, callbackOk, callbackError);
};

module.exports = DiscoverService;
