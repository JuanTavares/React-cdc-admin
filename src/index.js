import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import Home from './Home';
import Livro from './Livro';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" component={Livro} />
            </Switch>
        </App>
    </Router>
), document.getElementById('root')
);
registerServiceWorker();
