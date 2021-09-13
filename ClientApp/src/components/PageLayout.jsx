import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { Jumbotron, Button, Container } from 'reactstrap';
/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">B-B BMWWWWWWW Distributor </a>
                {isAuthenticated ? <SignOutButton /> : ""}
            </Navbar>
            {!isAuthenticated &&
                <Container>
                <Jumbotron>
                    <h1 className="display-3">Welcome To BMWWWWWW Distributor</h1>
                    <p className="lead">ONLY DEALERS CAN ABLE TO LOGIN THIS WEBSITE</p>
                    <hr className="my-2" />
                    <p>To Order BMWWWWWWW Cars, Please Login Below</p>
                    <p className="lead">
                    {isAuthenticated ? "" : <SignInButton />}
                    </p>
                </Jumbotron>
               
                </Container>
            }          
            <br />
            <br />
            {props.children}
        </>
    );
};