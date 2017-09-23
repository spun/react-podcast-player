import { combineReducers } from "redux";

import user from "./userReducer";
import suscriptions from "./suscriptionsReducer";
import podcast from "./podcastReducer";
import audios from "./audiosReducer";
import player from "./playerReducer";
import search from "./searchReducer";

// Combinación de todos los reducer
export default combineReducers({
	user,
	suscriptions,
	podcast,
	audios,
	player,
	search
});
