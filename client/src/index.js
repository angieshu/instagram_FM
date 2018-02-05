import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './css/index.css';

import App from './components/App';
import User from './components/User';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path='/' component={App} />
			<Route exact path='/:username' component={User} />
		</div>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
