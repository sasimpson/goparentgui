import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducer from './reducers/index'
import App from './App';
import {loadState, saveState} from './utils/index'

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const persistedState = loadState()

let store = createStore( 
    reducer, 
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => {
    saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
      <App /> 
  </Provider>,
  
  document.getElementById('root')
);

