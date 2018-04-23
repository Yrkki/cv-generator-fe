//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Redirect http to https
app.get('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
        res.redirect('https://' + req.hostname + req.url);
    else
        next() // Continue to other routes if we're not redirecting
});

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('https://index.html', { root: __dirname });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);


