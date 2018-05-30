import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainPage from './mainPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
<MainPage />
</div>, document.getElementById('root'));
registerServiceWorker();
