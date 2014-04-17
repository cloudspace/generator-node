/* GET home page. */
<% if(usePassport) { %>var request = require('request'); <% } %>

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index', {current_user: req.user});
    });

<% if(usePassport) { %>
    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user);
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    <% if(useFacebook) { %>
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }), function(req, res) {
      getOrCreateUser(req.user, setTokenCookiesAndRedirect(req, res));
    });
    <% } %>

    <% if(useGoogle) { %>
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }), function(req, res) {
      getOrCreateUser(req.user, setTokenCookiesAndRedirect(req, res));
    });
    <% } %>

    <% if(useGithub) { %>
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/'
    }), function(req, res) {
      getOrCreateUser(req.user, setTokenCookiesAndRedirect(req, res));
    });
    <% } %>

    <% if(useTwitter) { %>
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function(req, res) {
      getOrCreateUser(req.user, setTokenCookiesAndRedirect(req, res));
    });
    <% } %>

    <% if(useLinkedIn) { %>
    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: Math.random().toString(36).slice(2) }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function(req, res) {
      getOrCreateUser(req.user, setTokenCookiesAndRedirect(req, res));
    });
    <% } %>
<% } %>
}

<% if(usePassport) { %>
function storeRedirect(req, res, next) {
    req.session.return_to = req.get('Referrer') || '/';
    if (next) { next(); }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // If not loggged in, go home!
    res.redirect('/');
}

function getOrCreateUser(user, done) {
  request.post('https://<%= domain %>/api/v1/users', {form: {user: user, application_id: '<%= oauth_id %>'}}, function(err, response, body) {
    if (err) { return done(err); }
    done(null, JSON.parse(body));
  });
}

function setTokenCookiesAndRedirect(req, res) {
    return function(err, tokens) {
        if (err) { return res.redirect('/'); }
        res.cookie('accessToken', JSON.stringify(tokens.token));
        res.cookie('refreshToken', JSON.stringify(tokens.refresh_token));
        res.redirect(req.session.return_to || '/');
        delete req.session.return_to;
    };
}
<% } %>
