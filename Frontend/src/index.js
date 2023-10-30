import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
        domain="dev-stvaur6bjdl0g8p5.eu.auth0.com"
        clientId="c3HdzbgDRYutzMWNGyXbAOixXlDu6AZI"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
      <Main/>
    </Auth0Provider>,
  document.getElementById("root")
);