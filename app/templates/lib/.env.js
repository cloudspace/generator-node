# 3rd Party Env Variables
# Be sure your URLs on the 3rd Party App Settings are correct to your setup

<% if(props.facebookClientId != "" && props.facebookClientSecret != ""){ %>
FACEBOOK_CLIENT_ID=<%= props.facebookClientId %>
FACEBOOK_CLIENT_SECRET=<%= props.facebookClientSecret %>
<% } %>
<% if(props.twitterConsumerKey != "" && props.twitterConsumerSecret != ""){ %>
TWITTER_CONSUMER_KEY=<%= props.twitterConsumerKey %>
TWITTER_CONSUMER_SECRET=<%= props.twitterConsumerSecret %>
<% } %>
<% if(props.googleClientId != "" && props.googleClientSecret != ""){ %>
GOOGLE_CLIENT_ID=<%= props.googleClientId %>
GOOGLE_CLIENT_SECRET=<%= props.googleClientSecret %>
<% } %>
<% if(props.githubClientId != "" && props.githubClientSecret != ""){ %>
GITHUB_CLIENT_ID=<%= props.githubClientId %>
GITHUB_CLIENT_SECRET=<%= props.githubClientSecret %>
<% } %>
<% if(props.linkedInKey != "" && props.linkedin_secret != ""){ %>
LINKEDIN_KEY=<%= props.linkedInKey %>
LINKEDIN_SECRET=<%= props.linkedin_secret %>
<% } %>