// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import albums from './albums';
import imageview from './imageview';

const rootReducer = combineReducers({
  albums,
  router,
  imageview
});

export default rootReducer;
