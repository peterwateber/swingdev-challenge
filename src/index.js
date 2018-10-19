import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();
