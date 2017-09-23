import reducer from "../../src/js/reducers/audiosReducer";

describe("audios reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			// Audios podcast
			audiosFeed: null,
			audios: [],
			fetchingAudios: false,
			fetchedAudios: false,
			errorAudios: null
		});
	});
});
