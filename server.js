//Install express server
const express = require('express');
const app = express();
const compression = require('compression');

// compress responses
app.use(compression());

// Redirect http to https
app.get('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https' && !['localhost', '192.168.1.2'].includes(req.hostname)) {
        var url = 'https://' + req.hostname;
        // var port = app.get('port');
        // if (port)
        //   url += ":" + port;
        url += req.url;
        res.redirect(url);
    }
    else
        next()
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/dist'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
