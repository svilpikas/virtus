import { combineReducers } from "redux";
import mapReducer from "./containers/map/map.reducer";

import withPersistance from "./utils/withPersistance";

export default  withPersistance(combineReducers({map: mapReducer}));
