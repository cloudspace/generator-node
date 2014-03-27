# 3rd Party Env Variables
# Be sure your URLs on the 3rd Party App Settings are correct to your setup

<% if(props.facebook_client_id != "" && props.facebook_client_secret != ""){ %>
FACEBOOK_CLIENT_ID=<%= props.facebook_client_id %>
FACEBOOK_CLIENT_SECRET=<%= props.facebook_client_secret %>
<% } %>
<% if(props.twitter_consumer_key != "" && props.twitter_consumer_secret != ""){ %>
TWITTER_CONSUMER_KEY=<%= props.twitter_consumer_key %>
TWITTER_CONSUMER_SECRET=<%= props.twitter_consumer_secret %>
<% } %>
<% if(props.google_client_id != "" && props.google_client_secret != ""){ %>
GOOGLE_CLIENT_ID=<%= props.google_client_id %>
GOOGLE_CLIENT_SECRET=<%= props.google_client_secret %>
<% } %>
<% if(props.github_client_id != "" && props.github_client_secret != ""){ %>
GITHUB_CLIENT_ID=<%= props.github_client_id %>
GITHUB_CLIENT_SECRET=<%= props.github_client_secret %>
<% } %>
<% if(props.linkedin_key != "" && props.linkedin_secret != ""){ %>
LINKEDIN_KEY=<%= props.linkedin_key %>
LINKEDIN_SECRET=<%= props.linkedin_secret %>
<% } %>