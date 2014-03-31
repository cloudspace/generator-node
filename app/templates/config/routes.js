/* GET home page. */
module.exports = function(app, passport) {
    app.get('/', function(req, res){
        res.render('index', {current_user: req.user});
    });

<% if(/y/i.test(usePassport) === true){ %>
    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user);
    });

    <% if(facebookClientId != "" && facebookClientSecret != ""){ %>
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
    <% if(googleClientId != "" && googleClientSecret != ""){ %>
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
    <% if(githubClientId != "" && githubClientSecret != ""){ %>
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
    <% if(twitterConsumerKey != "" && twitterConsumerSecret != ""){ %>
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
    <% if(linkedInKey != "" && linkedin_secret != ""){ %>
    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: Math.random().toString(36).slice(2) }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    <% } %>
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
<% } %>
}

<% if(/y/i.test(usePassport) === true){ %>
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // If not loggged in, go home!
    res.redirect('/');
}
<% } %>