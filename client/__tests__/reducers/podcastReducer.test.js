import reducer from "../../src/js/reducers/podcastReducer";

describe("podcast reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			// Podcast details
			podcastDetails: {},
			fetching: false,
			fetched: false,
			error: null
		});
	});
});
