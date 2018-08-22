
# thekraken
A tool for sales to visualize data concerning projections and achievements

## Contribute
```diff
- Building this as it is set up will require that you are part of One Agencys Azure Active Directory 
- Although you could could build the .Net Core project yourself and couple it with another Jwt provider
- You will also need a Cinode user with administrative privileges
```

First clone this repo.

`git clone https://github.com/OneAgencySE/thekraken.git`

### Setup the application that retrives data from Cinode

After that set the environment variables declared in "docker-compose.yml".

```yml
environment:
      - CINODE_PASSWORD=${CINODE_PASSWORD}
      - CINODE_EMAIL=${CINODE_EMAIL}
      - CINODE_JSON_URL=${CINODE_JSON_URL}
```

These enable the service to access Cinode and expose the Json file residing at `${CINODE_JSON_URL}` trough its `/json` endpoint.

### Setup Microsoft Flow

The idea is to now use this api to put the data in Sharepoint where it can be accessed by PowerBI.

To do this we choose to setup a Microsoft Flow.
For testing the flow should be as follows:
`Button -> Http Request (with OAuth) -> Create file in Sharepoint`.
For production you should replace the button with a scheduled event.

### Setup PowerBI

```diff
+ COMMING SOON
```

### Setup NGINX

How you set up NGINX will vary depending on what system you are on and how you would like to set up security.

Here is a basic guide on SSL for NGINX: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

What is important is that `location /pbi/` points to `/wwwroot/pbi/index.html` and that `location /api/`poins to `localhost:{SERVICE_PORT}`.

*Its is imperative to point `location /` to `wwwroot/index.html` so the ducky can be displayed to ward of evil sprits*

There is an example for how this could look here: https://github.com/OneAgencySE/thekraken/blob/master/nginx_routing
