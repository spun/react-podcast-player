import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from "../reducers";

var customLogger = createLogger({
	// Ignorar los cambios de progreso del audio en reproducción al ser demasiados
	predicate: (getState, action) => action.type !== "PLAYER_CHANGE_PROGRESS"
});

// Middleware
// Eliminar el logger si se decide poner en producción
const middleware = applyMiddleware(thunk, customLogger);

export default createStore(reducer, middleware);
