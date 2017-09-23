import reducer from "../../src/js/reducers/suscriptionsReducer";

describe("suscriptions reducer", () => {
	const mockFn = jest.fn();
	const showToast = new mockFn();

	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			suscriptions: [],
			fetching: false,
			fetched: false,
			error: null,
			selectedSuscriptions: {}
		});
	});

	it("should handle FETCH_SUSCRIPTIONS_PENDING", () => {
		// From empty state
		expect(
			reducer(undefined, {
				type: "FETCH_SUSCRIPTIONS_PENDING"
			})
		).toEqual({
			suscriptions: [],
			fetching: true,
			fetched: false,
			error: null,
			selectedSuscriptions: {}
		});

		// From populated state
		expect(
			reducer(
				{
					suscriptions: [],
					fetching: true,
					fetched: false,
					error: null,
					selectedSuscriptions: {}
				},
				{
					type: "FETCH_SUSCRIPTIONS_PENDING"
				}
			)
		).toEqual({
			suscriptions: [],
			fetching: true,
			fetched: false,
			error: null,
			selectedSuscriptions: {}
		});
	});

	it("should handle FETCH_SUSCRIPTIONS_FULFILLED", () => {
		// From empty state
		expect(
			reducer(undefined, {
				type: "FETCH_SUSCRIPTIONS_FULFILLED",
				payload: [
					{
						suscription_id: 1,
						title: "Suscription 1"
					},
					{
						suscription_id: 2,
						title: "Suscription 2"
					}
				]
			})
		).toEqual({
			suscriptions: [
				{
					suscription_id: 1,
					title: "Suscription 1"
				},
				{
					suscription_id: 2,
					title: "Suscription 2"
				}
			],
			fetching: false,
			fetched: true,
			error: null,
			selectedSuscriptions: {}
		});

		// From populated state
		expect(
			reducer(
				{
					suscriptions: [
						{
							suscription_id: 1,
							title: "Suscription 1"
						},
						{
							suscription_id: 2,
							title: "Suscription 2"
						}
					],
					fetching: true,
					fetched: false,
					error: null,
					selectedSuscriptions: {}
				},
				{
					type: "FETCH_SUSCRIPTIONS_FULFILLED",
					payload: [
						{
							suscription_id: 3,
							title: "Suscription 3"
						},
						{
							suscription_id: 4,
							title: "Suscription 4"
						}
					]
				}
			)
		).toEqual({
			suscriptions: [
				{
					suscription_id: 3,
					title: "Suscription 3"
				},
				{
					suscription_id: 4,
					title: "Suscription 4"
				}
			],
			fetching: false,
			fetched: true,
			error: null,
			selectedSuscriptions: {}
		});
	});

	it("should handle FETCH_SUSCRIPTIONS_FULFILLED", () => {
		// From empty state
		expect(
			reducer(undefined, {
				type: "FETCH_SUSCRIPTIONS_FULFILLED",
				payload: [
					{
						suscription_id: 1,
						title: "Suscription 1"
					},
					{
						suscription_id: 2,
						title: "Suscription 2"
					}
				]
			})
		).toEqual({
			suscriptions: [
				{
					suscription_id: 1,
					title: "Suscription 1"
				},
				{
					suscription_id: 2,
					title: "Suscription 2"
				}
			],
			fetching: false,
			fetched: true,
			error: null,
			selectedSuscriptions: {}
		});

		// From populated state
		expect(
			reducer(
				{
					suscriptions: [
						{
							suscription_id: 1,
							title: "Suscription 1"
						},
						{
							suscription_id: 2,
							title: "Suscription 2"
						}
					],
					fetching: true,
					fetched: false,
					error: null,
					selectedSuscriptions: {}
				},
				{
					type: "FETCH_SUSCRIPTIONS_FULFILLED",
					payload: [
						{
							suscription_id: 3,
							title: "Suscription 3"
						},
						{
							suscription_id: 4,
							title: "Suscription 4"
						}
					]
				}
			)
		).toEqual({
			suscriptions: [
				{
					suscription_id: 3,
					title: "Suscription 3"
				},
				{
					suscription_id: 4,
					title: "Suscription 4"
				}
			],
			fetching: false,
			fetched: true,
			error: null,
			selectedSuscriptions: {}
		});
	});
});
