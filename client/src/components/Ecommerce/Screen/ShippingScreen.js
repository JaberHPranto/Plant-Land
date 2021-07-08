import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import CheckoutSteps from "../CheckoutSteps";
import { saveShippingAddress } from "../../../redux/actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [thana, setThana] = useState(shippingAddress.thana);
  const [houseNumber, setHouseNumber] = useState(shippingAddress.houseNumber);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(saveShippingAddress({ address, city, thana, houseNumber }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="thana">
          <Form.Label>Thana</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Thana"
            value={thana}
            required
            onChange={(e) => setThana(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="houseNumber">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter House Number"
            value={houseNumber}
            required
            onChange={(e) => setHouseNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
