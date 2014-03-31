var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

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
    },
    linkedin: {
        clientID     : '' || process.env.LINKEDIN_KEY,
        clientSecret : '' || process.env.LINKEDIN_SECRET,
        callbackURL    : '/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
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
    <% if(props.facebookClientId != "" && props.facebookClientSecret != ""){ %>
    passport.use(new FacebookStrategy(authConfig.facebook, verifyOauth2));
    <% } %>
    <% if(props.twitterConsumerKey != "" && props.twitterConsumerSecret != ""){ %>
    passport.use(new TwitterStrategy(authConfig.twitter, verifyTwitter))
    <% } %>
    <% if(props.googleClientId != "" && props.googleClientSecret != ""){ %>
    passport.use(new GoogleStrategy(authConfig.google, verifyOauth2));
    <% } %>
    <% if(props.githubClientId != "" && props.githubClientSecret != ""){ %>
    passport.use(new GitHubStrategy(authConfig.github, verifyOauth2));
    <% } %>
    <% if(props.linkedInKey != "" && props.linkedin_secret != ""){ %>
    passport.use(new LinkedInStrategy(authConfig.linkedin, verifyOauth2));
    <% } %>
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

function verifyTwitter(token, tokenSecret, profile, done) {
    // asynchronous
    process.nextTick(function() {
        user = {};
        user.provider     = profile.provider;
        user.provider_id  = profile.id;
        user.name         = profile.displayName
        user.token        = token;
        user.token_secret = tokenSecret;

        // If successfull, pass null as first, and user as second
        return done(null, user);

        // If not authenticated (bad password, etc...), return false as second
        // return done(null, false);

        // If server error, throw error as first
        // return done(err);
    });
}