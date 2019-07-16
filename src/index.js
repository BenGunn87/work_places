import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router} from 'react-router-dom';

import "antd/dist/antd.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import peopleStore from "./stores/people-store";

const stores = {
  peopleStore
};


ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
