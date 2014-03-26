var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var authConfig = {
    facebook: {
        clientID     : '' || process.env.FACEBOOK_CLIENT_ID,
        clientSecret : '' || process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : '/auth/facebook/callback'
    },
    google: {
        clientID     : '' || process.env.GOOGLE_CLIENT_ID,
        clientSecret : '' || process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : '/auth/google/callback'
    },
    github: {
        clientID     : '' || process.env.GITHUB_CLIENT_ID,
        clientSecret : '' || process.env.GITHUB_CLIENT_SECRET,
        callbackURL  : '/auth/github/callback'
    },
    twitter: {
        consumerKey    : '' || process.env.TWITTER_CONSUMER_KEY,
        consumerSecret : '' || process.env.TWITTER_CONSUMER_SECRET,
        callbackURL    : '/auth/twitter/callback'
    }
};

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new FacebookStrategy(authConfig.facebook, verifyOauth2));
    // passport.use(new GoogleStrategy(authConfig.google, verifyOauth2));
    // passport.use(new GitHubStrategy(authConfig.github, verifyOauth2));
    // passport.use(new TwitterStrategy(authConfig.twitter, verifyOauth1));
};

// This is generic across Oauth2 Providers
function verifyOauth2(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
        user = {};
        user.provider      = profile.provider;
        user.provider_id   = profile.id;
        user.name          = profile.name.givenName + ' ' + profile.name.familyName;
        user.email         = profile.emails[0].value;
        user.access_token  = access_token;
        user.refresh_token = refresh_token;

        // If successfull, pass null as first, and user as second
        return done(null, user);

        // If not authenticated (bad password, etc...), return false as second
        // return done(null, false);

        // If server error, throw error as first
        // return done(err);
    });
}

function verifyOauth1(token, tokenSecret, profile, done) {
    // asynchronous
    process.nextTick(function() {
        user = {};
        user.provider     = profile.provider;
        user.provider_id  = profile.id;
        user.name         = profile.name.givenName + ' ' + profile.name.familyName;
        user.email        = profile.emails[0].value;
        user.token        = token;
        user.token_secret = token_secret;

        // If successfull, pass null as first, and user as second
        return done(null, user);

        // If not authenticated (bad password, etc...), return false as second
        // return done(null, false);

        // If server error, throw error as first
        // return done(err);
    });
}