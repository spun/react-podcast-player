import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
// Component under test
import About from "../../src/js/components/About";

test("About section creation", () => {
	const component = renderer.create(<About />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
