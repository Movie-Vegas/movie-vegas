import React from 'react';
import ReactDOM from 'react-dom';
import MovieVegasApp from './movie-vegas-app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MovieVegasApp/>, document.getElementById('root'));

// If you want movie vegas app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
