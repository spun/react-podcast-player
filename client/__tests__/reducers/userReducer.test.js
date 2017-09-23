import reducer from "../../src/js/reducers/userReducer";

describe("user reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			email: null,
			fetching: false,
			fetched: false,
			error: null
		});
	});
});
