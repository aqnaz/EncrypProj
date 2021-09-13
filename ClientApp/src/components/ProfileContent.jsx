import React, { useState, Component } from "react";
import {  useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button, Container } from "react-bootstrap";
import OrderItems from "./OrderItems";
import { Form, FormGroup, Label, Input, FormText, Alert, Row} from 'reactstrap';

const ProfileContent = () => {

    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    }

    return (
        <>
            <Container>
                <h5 className="card-title">Welcome,  {name.toUpperCase()}</h5>
                {accessToken ?
                    <Row>
                        <Alert color="danger">
                            Access Token Acquired from Azure AD to access API
                        </Alert>
                        <FormGroup className="mb-4">
                            <Label for="accessToken"></Label>
                            <Input type="textarea" name="accessToken" id="accessToken" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
                        </FormGroup>    

                        <OrderItems accessToken={accessToken} clientName={name.toUpperCase()} />
                    </Row>
                    :
                    <Button variant="secondary" onClick={RequestAccessToken} >Request Access  Token</Button>
                    }
            </Container>
        </>
    );
};
export default ProfileContent;

