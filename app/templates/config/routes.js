/* GET home page. */
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
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>

    <% if(useGoogle) { %>
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>

    <% if(useGithub) { %>
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>

    <% if(useTwitter) { %>
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>

    <% if(useLinkedIn) { %>
    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: Math.random().toString(36).slice(2) }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
<% } %>
}

<% if(usePassport) { %>
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // If not loggged in, go home!
    res.redirect('/');
}
<% } %>
