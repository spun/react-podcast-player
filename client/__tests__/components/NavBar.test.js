import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
// Component under test
import NavBar from "../../src/js/components/NavBar";

test("NavBar creation", () => {
	const userEmail = "demoEmail";

	const component = renderer.create(
		<MemoryRouter>
			<NavBar userName={userEmail} />
		</MemoryRouter>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
