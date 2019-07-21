import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router} from 'react-router-dom';
import "antd/dist/antd.css";
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import rootStore from "./stores/rootStore";

ReactDOM.render(
  <Provider {...rootStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
