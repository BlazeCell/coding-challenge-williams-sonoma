const express = require('express');
const path = require('path');

const app = express();

// Needed to access local files from HTML
app.use(express.static(__dirname + '/public/'));

// Load index.html
app.get('/', function(req, res)
{
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server on port 80
const server = app.listen(80, function()
{
	console.log('Server live');
	console.log('Listening on port %d', server.address().port);
});

