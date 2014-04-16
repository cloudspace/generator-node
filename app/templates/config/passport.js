<% if(useFacebook) { %>var FacebookStrategy = require('passport-facebook').Strategy;<% } %>
<% if(useGoogle) { %>var GoogleStrategy = require('passport-google-oauth').Strategy;<% } %>
<% if(useGithub) { %>var GitHubStrategy = require('passport-github').Strategy;<% } %>
<% if(useTwitter) { %>var TwitterStrategy = require('passport-twitter').Strategy;<% } %>
<% if(useLinkedIn) { %>var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;<% } %>

var authConfig = {
  <% if(useFacebook) { %>
    facebook: {
        clientID     : '' || process.env.FACEBOOK_CLIENT_ID,
        clientSecret : '' || process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : '/auth/facebook/callback'
    },
  <% } %>
  <% if(useGoogle) { %>
    google: {
        clientID     : '' || process.env.GOOGLE_CLIENT_ID,
        clientSecret : '' || process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : '/auth/google/callback'
    },
  <% } %>
  <% if(useGithub) { %>
    github: {
        clientID     : '' || process.env.GITHUB_CLIENT_ID,
        clientSecret : '' || process.env.GITHUB_CLIENT_SECRET,
        callbackURL  : '/auth/github/callback'
    },
  <% } %>
  <% if(useTwitter) { %>
    twitter: {
        consumerKey    : '' || process.env.TWITTER_CONSUMER_KEY,
        consumerSecret : '' || process.env.TWITTER_CONSUMER_SECRET,
        callbackURL    : '/auth/twitter/callback'
    },
  <% } %>
  <% if(useLinkedIn) { %>
    linkedin: {
        clientID     : '' || process.env.LINKEDIN_CLIENT_ID,
        clientSecret : '' || process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL    : '/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
    }
  <% } %>
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
    <% if(useFacebook) { %>
    passport.use(new FacebookStrategy(authConfig.facebook, verifyOauth2));
    <% } %>
    <% if(useTwitter) { %>
    passport.use(new TwitterStrategy(authConfig.twitter, verifyOauth1))
    <% } %>
    <% if(useGoogle) { %>
    passport.use(new GoogleStrategy(authConfig.google, verifyOauth2));
    <% } %>
    <% if(useGoogle) { %>
    passport.use(new GitHubStrategy(authConfig.github, verifyOauth2));
    <% } %>
    <% if(useLinkedIn) { %>
    passport.use(new LinkedInStrategy(authConfig.linkedin, verifyOauth2));
    <% } %>
};

<% if(useFacebook || useGoogle || useGithub || useLinkedIn) { %>
// This is generic across Oauth2 Providers
function verifyOauth2(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
        user = {};
        user.provider      = profile.provider;
        user.provider_uid  = profile.id;
        user.first_name    = profile.name.givenName;
        user.last_name     = profile.name.familyName;
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
<% } %>

<% if(useTwitter) { %>
function verifyOauth1(token, tokenSecret, profile, done) {
    // asynchronous
    process.nextTick(function() {
        user = {};
        user.provider     = profile.provider;
        user.provider_uid = profile.id;
        user.first_name   = profile.name.givenName;
        user.last_name    = profile.name.familyName;
        user.email        = profile.emails[0].value;
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
<% } %>
