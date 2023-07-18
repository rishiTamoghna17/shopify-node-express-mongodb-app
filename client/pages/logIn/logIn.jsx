import React from "react";
import Login from "../../components/LogIn/Login";
import { Page } from '@shopify/polaris'

function logIn() {
  return (
    <Page fullWidth>
      <div>
        <Login />
      </div>
    </Page>
  );
}

export default logIn;
