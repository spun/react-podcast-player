import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
// Component under test
import PodcastAudiosList from "../../src/js/components/PodcastAudiosList";

test("PodcastAudiosList creation", () => {
	const audios = [
		{ audio_id: 1, audio_title: "audio 1" },
		{ audio_id: 2, audio_title: "audio 2" }
	];

	const matchUrl = {
		url: "/podcast/0"
	};

	const component = renderer.create(
		<MemoryRouter>
			<PodcastAudiosList list={audios} match={matchUrl} />
		</MemoryRouter>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
