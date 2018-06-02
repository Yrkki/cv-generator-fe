//Install express server
const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

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

// calc the root path
const root = path.join(__dirname + '/dist');

// Serve only the static files form the dist directory
app.use(express.static(root));

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: root});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
