import React, { useState, useEffect } from "react";
import {
    Alert, Button, Card, CardBody, CardImg,
    CardTitle, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap';
import { graphConfig } from "../authConfig";

const OrderItems = (props) => {

    const [singlePrice, setSinglePrice] = useState(15000);   
    const [carQuantity, setCarQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(15000);
    const [creditCard, setCreditCard] = useState("");   
    const [cvv, setCvv] = useState("");   
    const [carModel, setCarModel] = useState("");   
    const [isError, setIsError] = useState(false);   
    const [errorMessage, setErrorMessage] = useState("");   
    const [enCreditCard, setEnCreditCard] = useState("");   
    const [encvv, setEncvv] = useState("");   
    const [deCreditCard, setDeCreditCard] = useState("");
    const [decvv, setDecvv] = useState("");   
    const [ivKey, setIvKey] = useState("");   
    const [key, setKey] = useState("");   

    const handleChange = (e) => {
        const { value } = e.target;

        setCarQuantity(parseInt(value))
        setTotalPrice(singlePrice * value)
    }


    const handleDecrypt = () => {
        getItem();  
    }


    const handleCick = () => {    
        

        const info = {
            "CustomerName": props.clientName,
            "CarModel": carModel,
            "Quantity": carQuantity,
            "TotalPrice": totalPrice,
            "CrediCardNumber": creditCard,
            "Cvv": cvv
        };

        

        postItem(info);
          
    }


    async function getItem() {
        const headers = new Headers();
        const bearer = `Bearer ${props.accessToken}`;

        headers.append("Authorization", bearer);

        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json");

        const keys = {
            "iVBase64": ivKey,
            "Key": key
        }

        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(keys),
        };
 
      
        return fetch(`${graphConfig.graphMeEndpoint}/get`, options)
            .then(response => response.json())
            .then((data) => {
                setIsError(false);
                setDeCreditCard(data.crediCardNumber);
                setDecvv(data.cvv);
              
            })
            .catch(error => {
                setIsError(true);
                setErrorMessage("Invalid Access Token")
            });
    } 


    async function postItem(info) {
        const headers = new Headers();
        const bearer = `Bearer ${props.accessToken}`;

        headers.append("Authorization", bearer);

        headers.append("Accept","application/json, text/plain, */*");
        headers.append("Content-Type","application/json");
         
        setDeCreditCard("");
        setDecvv("");
      
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(info),
        };

     

        return fetch(`${graphConfig.graphMeEndpoint}/post`, options)
            .then(response => response.json())
            .then((data) => {
                setIsError(false);
                setEnCreditCard(data.crediCardNumber);
                setEncvv(data.cvv);
                setIvKey(data.iVBase64);
                setKey(data.key)
            })
            .catch(error => {                
                setIsError(true);
                setErrorMessage("Invalid Access Token")
            });
    } 


    return (
        <>
            {props.accessToken &&
            <div>
                    <Alert color="primary">Fill the details to order Cars below:</Alert>    
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg top width="100%" src="https://user-images.githubusercontent.com/10125280/36883899-2832b006-1d92-11e8-8152-affa6551010d.jpg" alt="BMW" />
                                <CardBody>
                                    <CardTitle tag="h5">BMW M2</CardTitle>
                                 
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6">
                            <Form>
                                <FormGroup>
                                        <Label for="ClientName">Client Name</Label>
                                        <Input type="text" name="ClientName" id="ClientName" placeholder="ClientName" readOnly value={props.clientName} />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="CarModel">Model No.</Label>
                                    <Input type="text" name="CarModel" id="CarModel" placeholder=""  value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="Quantity">Quantity</Label>
                                <Input type="number" name="Quantity" id="Quantity" value={carQuantity} onChange={handleChange} />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="Price">Price</Label>
                                    <Input type="number" name="Price" id="Price" readOnly placeholder={singlePrice} />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="Total Price">Total Price</Label>
                                    <Input type="number" name="TotalPrice" id="TotalPrice" readOnly value={totalPrice} />
                                </FormGroup>
                            
                                <FormGroup>
                                    <Label for="CreditCard Number">CrediCard Number {creditCard}</Label>
                                    <Input type="number" name="CrediCardNumber" id="CrediCardNumber" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Cvv">Cvv {cvv}</Label>
                                    <Input type="number" name="Cvv" id="Cvv" placeholder="Cvv Number" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <Button onClick={handleCick}>Pay Proceed</Button>
                                </FormGroup>                                 
                              </Form>                     
                    </Col>
                </Row>                



                <Row className="mt-4">
                    {isError ? 
                        <Col xs="12">
                            <Alert color="danger">{errorMessage}</Alert>
                        </Col>
                        :
                        <Row>
                            <Col xs="6">
                                <Alert color="primary">Symmetric Encrypted Credit Card  </Alert>
                                <Alert color="default">IVBase64 :  {ivKey} </Alert>
                                <Alert color="default">Key :  {key} </Alert>
                                <Alert color="default">Encrypted : {enCreditCard} </Alert>                               
                                <Button onClick={handleDecrypt}>Decrypt</Button>
                            </Col>
                             <Col xs="6">
                                <Alert color="primary">Symmetric Encrypted CVV </Alert>
                                <Alert color="default">IVBase64 :  {ivKey} </Alert>
                                <Alert color="default">Key :  {key} </Alert>
                                <Alert color="default">Encrypted : {encvv} </Alert>       
                            </Col>                            

                            <Row className="mt-2">
                                <Col xs="6">
                                    <Alert color="primary">Symmetric Decrypted Credit Card  </Alert>
                                    <Alert color="default">{deCreditCard} </Alert>                              
                                </Col>
                                <Col xs="6">
                                    <Alert color="primary">Symmetric Decrypted CVV </Alert>
                                    <Alert color="default">{decvv} </Alert>

                                </Col>
                            </Row>   
                        </Row>     
                        }                   
                </Row>                
                </div>
            }
        </>
    );
};
export default OrderItems;

