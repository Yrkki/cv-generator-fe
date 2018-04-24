//Install express server
const express = require('express');
const app = express();
const compression = require('compression');

// compress responses
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);


