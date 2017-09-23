import reducer from "../../src/js/reducers/searchReducer";

describe("search reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			searchResult: null,
			fetching: false,
			fetched: false,
			error: null
		});
	});
});
