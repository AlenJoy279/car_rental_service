import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { Auth0Provider } from '@auth0/auth0-react';


import { getAllAvailableCars, getMyUser, getUserByID } from "./API.js"

// getAllAvailableCars().then(console.log);
// getUserByID("1").then(console.log);


ReactDOM.render(
  <Auth0Provider
        domain="dev-stvaur6bjdl0g8p5.eu.auth0.com"
        clientId="c3HdzbgDRYutzMWNGyXbAOixXlDu6AZI"
        authorizationParams={{
          audience: "http://localhost:3000",
          redirect_uri: window.location.origin
        }}
        cacheLocation="localstorage"
    >
      <Main/>
    </Auth0Provider>,
  document.getElementById("root")
); 