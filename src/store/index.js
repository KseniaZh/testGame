import { combineReducers } from "redux";

import stateGame from './Game/reducerGame';



const rootReducer = combineReducers({
    stateGame,
})

export default rootReducer