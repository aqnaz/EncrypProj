import { Route } from 'react-router';
import { PageLayout } from "./components/PageLayout";
import React, {  Component } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import './custom.css'
import ProfileContent from './components/ProfileContent';
import { Alert } from 'reactstrap';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <PageLayout>
            <AuthenticatedTemplate>
                <Route exact path='/' component={ProfileContent} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Alert color="danger">You are not signed in! Please sign in.</Alert>
            </UnauthenticatedTemplate>
        </PageLayout>     
    );
  }
}



