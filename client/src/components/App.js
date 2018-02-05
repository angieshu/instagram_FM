import React, { Component } from 'react';
import axios from 'axios';

import '../css/App.css';

class App extends Component {
	handleClick() {
		axios({
			method: 'post',
			url: '/users',
			data: { username: document.getElementById('username').value }
		}).then(res => {console.log(res);}).catch(e => {console.log(e);});
		this.props.history.push('/username');
	}

	render() {
	return (
		<div className="App">
			Enter your username
			<input id="username" type="text" />
			<button onClick={this.handleClick.bind(this)}>Submit</button>
		</div>
		);
	}
}

export default App;
