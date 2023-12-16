// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SmartHomeManager } = require('smarthome-manager')
var http = require('http');
var philipsHueID = '/api/paval/lights/';

const app = express();

app.use(cors());
app.use(bodyParser.json());

var server = express();
server.use('/', express.static(__dirname + '/'));
server.get('/switch', function(req, res, next) {
	var querystring = require('querystring');
    var data = '{"on":'+req.query.toggle+'}';
	var options = {
		host: '<<insert your gateway IP address here>>',
		port: 80,
		path: philipsHueID+req.query.id+'/state',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	var hueReq = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log("body: " + chunk);
		});
	});
	hueReq.write(data);
	hueReq.end();
	res.sendStatus(200)
});

server.listen(8686, function () {
  console.log('Server is listening on port 8686.')
})
