import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainTemplate from './mainTemplate'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainTemplate />, document.getElementById('root'));
registerServiceWorker();
