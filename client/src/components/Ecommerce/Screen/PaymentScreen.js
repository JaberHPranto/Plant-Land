import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import CheckoutSteps from "../CheckoutSteps";
import { savePaymentMethod } from "../../../redux/actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal" ? true : false}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="SSL E-Commerce"
              id="SSL E-Commerce"
              name="paymentMethod"
              value="SSL E-Commerce"
              checked={paymentMethod === "SSL E-Commerce" ? true : false}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
