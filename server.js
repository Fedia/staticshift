var fs = require('fs');
var express = require('express');
var jsDAV = require('jsDAV/lib/jsdav');
var abasic = require('jsDAV/lib/DAV/plugins/auth/abstractBasic');

var WWW_DIR = process.env.OPENSHIFT_DATA_DIR + 'www';
fs.mkdir(WWW_DIR);

var auth = abasic.extend({
  validateUserPass: function(user, pass, done) {
    done(pass === process.env.OPENSHIFT_APP_UUID);
  }
});

var app = express();
var dav = jsDAV.mount({
  node: WWW_DIR,
  mount: '/',
  server: app,
  standalone: false,
  authBackend:  auth.new(),
  realm: 'WebDAV'
});

var dav_agent = /(WebDAV|DavClnt|litmus|gvfs|davfs|cadaver|BitKinex|sardine)/i;

app.all('*', function(req, res, next) {
  var ua = req.get('user-agent');
  if (dav_agent.test(ua)) {
    dav.exec(req, res);
  } else {
    next();
  }
});

app.use(
  express.static(WWW_DIR),
  function(req, res) {
    res.status(404).sendFile(WWW_DIR + '/404.html', function(err) {
      if (err) {
        res.sendStatus(404);
      }
    });
  }
);

app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
