import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {saveState, loadState} from "./localStorage";
import {createLogger} from "redux-logger";
import {UPDATE_GAME_LEVEL} from "./ReduxStoreActions";

const default_game = {
	disknum : 0,
	tower1: [],
	tower2: [],
	tower3: [],
	activeTower: '',
	gameStatus: 'static'
}

const gameReducer= (state = default_game, action) => {
  switch (action.type) {
    case UPDATE_GAME_LEVEL:
      return {...state,
        disknum: action.disknum,
      }
    default:
      return state
  }
}

const composeEhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({game: gameReducer});

const store = createStore(rootReducer, loadState(), composeEhancers(applyMiddleware(createLogger())))

store.subscribe(() => {
	saveState(store.getState())
});

export default store;