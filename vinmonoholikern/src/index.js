import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Banner from './banner'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Banner />, document.getElementById('root'));
registerServiceWorker();
