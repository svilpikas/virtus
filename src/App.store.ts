/*
 *
 * Redux store configured with Redux thunk middleware to allow async calls
 * and Redux Developer Tools (https://github.com/zalmoxisus/redux-devtools-extension)
 *
*/

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import combinedReducers from './App.reducer';

export default function configureStore(initialState: any) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(combinedReducers, initialState, composeEnhancers(
      applyMiddleware(thunk),
  ));

  return store;
}
