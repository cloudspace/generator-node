<!doctype html>
<html>
  <body>
    <h2>Passport Example</h2>
    <p>All the generator does for now is return the json response after auth.</p>
    <div>
      <% if(facebookClientId != "" && facebookClientSecret != ""){ %>
      <p>Log in with <a href="/auth/facebook/">Facebook</a></p>
      <% } %>
      <% if(googleClientId != "" && googleClientSecret != ""){ %>
      <p>Log in with <a href="/auth/google/">Google</a></p>
      <% } %>
      <% if(githubClientId != "" && githubClientSecret != ""){ %>
      <p>Log in with <a href="/auth/github/">GitHub</a></p>
      <% } %>
      <% if(twitterConsumerKey != "" && twitterConsumerSecret != ""){ %>
      <p>Log in with <a href="/auth/twitter/">Twitter</a></p> 
      <% } %>
      <% if(linkedInKey != "" && linkedin_secret != ""){ %>
      <p>Log in with <a href="/auth/linkedin/">LinkedIn</a></p> 
      <% } %>
      <br /><br />
      <p><a href="/profile">Profile</a></p>
      <p><a href="/logout">Logout</a></p>
    </div>
  </body>
</html>