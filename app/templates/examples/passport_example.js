<!doctype html>
<html>
  <body>
    <h2>Passport Example</h2>
    <p>All the generator does for now is return the json response after auth.</p>
    <div>
      <% if(props.facebookClientId != "" && props.facebookClientSecret != ""){ %>
      <p>Log in with <a href="/auth/facebook/">Facebook</a></p>
      <% } %>
      <% if(props.googleClientId != "" && props.googleClientSecret != ""){ %>
      <p>Log in with <a href="/auth/google/">Google</a></p>
      <% } %>
      <% if(props.githubClientId != "" && props.githubClientSecret != ""){ %>
      <p>Log in with <a href="/auth/github/">GitHub</a></p>
      <% } %>
      <% if(props.twitterConsumerKey != "" && props.twitterConsumerSecret != ""){ %>
      <p>Log in with <a href="/auth/twitter/">Twitter</a></p> 
      <% } %>
      <% if(props.linkedInKey != "" && props.linkedin_secret != ""){ %>
      <p>Log in with <a href="/auth/linkedin/">LinkedIn</a></p> 
      <% } %>
      <br /><br />
      <p><a href="/profile">Profile</a></p>
      <p><a href="/logout">Logout</a></p>
    </div>
  </body>
</html>