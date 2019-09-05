import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, {FirebaseContext} from './components/Firebase'
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(
    <FirebaseContext.Provider value = {new Firebase()}>
        <Router>
            <App />
        </Router>
    </FirebaseContext.Provider>,
    document.getElementById('root')
    );

serviceWorker.unregister();
