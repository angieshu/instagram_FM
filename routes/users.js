var express = require('express');
var axios = require('axios');
var localStorage = require('localStorage');

var router = express.Router();

const SERVER = 'https://isolutions.fm';
const TOKEN = '/fmi/rest/api';
const DB = 'RideAlong';

const LAYOUT1 = "USER";
const LAYOUT2 = "PICTURE";

/* GET users listing. */

router.post('/', function(req, res, next) {
	let data = {};

	let creds = {
		user: "admin",
		password: "password",
		layout: LAYOUT1
	}

	axios.post(`${SERVER}${TOKEN}/auth/${DB}`, creds)
	  .then(response => {
		let headers = {headers: {'FM-Data-token': response.data.token}};
		localStorage.setItem('fmToken', JSON.stringify(headers));
	}).then(response => {
		let request = JSON.parse(localStorage.getItem('fmToken'));

		request.method = 'post';
		request.url = `${SERVER}${TOKEN}/find/${DB}/${LAYOUT1}`;
		request.data = {
			query: [{'NAME_NICK': req.body.username}]
		}
		return axios(request);
	}).then(response => {
		data.info = response.data.data.filter(el => el.fieldData.NAME_NICK.toUpperCase() === req.body.username.toUpperCase())[0];
    //
	// 	let request = JSON.parse(localStorage.getItem('fmToken'));
	// 	request.method = 'post';
	// 	request.url = `${SERVER}${TOKEN}/find/${DB}/${LAYOUT2}`;
	// 	request.data = {
	// 		query: [{'_fkUSER': data.info.__pkID}]
	// 	};
	// 	return axios(request);
	// }).then(response => {
	// 	data.pictures = [];
		// response.data.data.map(el => data.pictures.push(el.fieldData));
		res.json(data);
	}).catch(e => console.log(e));
});

module.exports = router;
