import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers/index'
import App from './App';
import {loadState, saveState} from './utils/index'

import './index.css';

const persistedState = loadState()

let store = createStore( 
    reducer, 
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
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

