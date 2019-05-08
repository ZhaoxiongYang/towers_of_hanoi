import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {saveState, loadState} from "./localStorage";
import {createLogger} from "redux-logger";
import {UPDATE_GAME_LEVEL, UPDATE_GAME_STATUS, UPDATE_PRE_STEP_STATUS} from "./ReduxStoreActions";

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
        needInit: action.needInit,
      }
    case UPDATE_GAME_STATUS:
      return {...state,
        tower1: action.tower1,
		tower2: action.tower2,
		tower3: action.tower3,
		activeTower: action.activeTower,
		gameStatus: action.gameStatus,
		needInit: action.needInit,
      }
    case UPDATE_PRE_STEP_STATUS:
    	console.log("here")
      return {...state,
        pre_tower1: action.pre_tower1,
		pre_tower2: action.pre_tower2,
		pre_tower3: action.pre_tower3,
		pre_activeTower: action.pre_activeTower,
		pre_gameStatus: action.pre_gameStatus,
		pre_needInit: action.pre_needInit,
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