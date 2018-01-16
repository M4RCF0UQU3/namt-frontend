require("babel-core/register");
require("babel-polyfill");

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App'; // Our custom react component
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

const initialState = {
  count: 0,
  connected: false
};


function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        count: state.count+1
      });
    case 'DECREMENT':
      return Object.assign({}, state, {
        count: state.count-1
      });
	case 'CONNECT':
      return Object.assign({}, state, {
        connected: true
      });
	case 'DISCONNECT':
      return Object.assign({}, state, {
        connected: false
      });
    default:
      return state;
  }
}

const store = createStore(reducer);

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<MainApp />, document.getElementById('root'));