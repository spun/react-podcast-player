import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
// Component under test
import SuscriptionsList from "../../src/js/components/SuscriptionsList";

test("SuscriptionsList creation with items", () => {
	const listIn = [
		{
			suscription_id: 1,
			title: "Suscription 1"
		},
		{
			suscription_id: 2,
			title: "Suscription 2"
		}
	];

	const component = renderer.create(
		<MemoryRouter>
			<SuscriptionsList list={listIn} />
		</MemoryRouter>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
