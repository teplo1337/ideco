import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import Monitor from './Monitor';
import Admin from './Admin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Monitor} />
      <Route exact path="/adm" component={Admin} />
    </div>
  </Router>, document.getElementById('root')
);
registerServiceWorker();
