import React from 'react';
import { render, } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, } from 'react-redux';
import { reducer as formReducer, initialize, } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import App from './App';
import exampleReducer from './reducer';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  form: formReducer,
});

function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
}
const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(saga);
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
