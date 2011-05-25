    <script type="text/x-jqote-template" class="infowindow-template"> 
      <div class="infowindow">
        <h2><%= this.title %></h2>
        
        <% if (this.description) { %>
          <p><%= this.description %></p>
        <% } %>
        
        <% if (this.openinghours || this.telephone || this.website) { %>
          <dl>
            <% if (this.openinghours) { %>
              <dt>Opening Hours</dt>
              <dd><%= this.openinghours %></dd>
            <% } %>

            <% if (this.telephone) { %>
              <dt>Tel</dt>
              <dd><a href="tel:<%= this.telephone %>"><%= this.telephone %></a></dd>
            <% } %>

            <% if (this.website) { %>
              <dt>Website</dt>
              <dd><a href="<%= this.website %>"><%= this.website %></a></dd>
            <% } %>
          </dl>
        <% } %>
      </div>
    </script>