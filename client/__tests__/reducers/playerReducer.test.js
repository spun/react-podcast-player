import reducer from "../../src/js/reducers/playerReducer";

describe("player reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			audio: {},
			isPlaying: false,
			volume: 100,
			duration: 0,
			progress: 0,
			playbackRate: 1
		});
	});
});
