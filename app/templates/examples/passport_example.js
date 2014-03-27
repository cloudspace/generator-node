<!doctype html>
<html>
  <body>
    <h2>Passport Example</h2>
    <p>All the generator does for now is return the json response after auth.</p>
    <div>
      <% if(props.facebook_client_id != "" && props.facebook_client_secret != ""){ %>
      <p>Log in with <a href="/auth/facebook/">Facebook</a></p>
      <% } %>
      <% if(props.google_client_id != "" && props.google_client_secret != ""){ %>
      <p>Log in with <a href="/auth/google/">Google</a></p>
      <% } %>
      <% if(props.github_client_id != "" && props.github_client_secret != ""){ %>
      <p>Log in with <a href="/auth/github/">GitHub</a></p>
      <% } %>
      <% if(props.twitter_consumer_key != "" && props.twitter_consumer_secret != ""){ %>
      <p>Log in with <a href="/auth/twitter/">Twitter</a></p> 
      <% } %>
      <% if(props.linkedin_key != "" && props.linkedin_secret != ""){ %>
      <p>Log in with <a href="/auth/linkedin/">LinkedIn</a></p> 
      <% } %>
      <br /><br />
      <p><a href="/profile">Profile</a></p>
      <p><a href="/logout">Logout</a></p>
    </div>
  </body>
</html>