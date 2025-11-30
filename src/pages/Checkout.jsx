import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Checkout() {
    const [validated, setValidated] = useState(false);
    const [cardData, setCardData] = useState([]); // ✔ правильный стейт
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        state: '',
        city: '',
        address: '',
        zip: '',
        tel: '',
        email: '',
        cardNumber: '',
        expirationMM: '',
        expirationYY: '',
        cardSecurityCode: '',
    });

    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getCartData();
    }, []);

    const getCartData = () => {
        const token = localStorage.getItem('token');

        axios.get(baseUrl + "/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setCardData(response.data); // ✔ исправлено
                    calculateTotal(response.data);
                } else {
                    alert("Error");
                }
            })
            .catch((error) => handleError(error));
    };

    const calculateTotal = (data) => {
        const sum = data.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        setTotal(sum);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const clearCart = () => {
        const token = localStorage.getItem('token');

        axios.delete(baseUrl + '/cart/clear', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch((error) => handleError(error));
    };

    const handleError = (error) => {
        console.error("Error:", error);
        alert("An error occurred: " + (error.response?.data?.message || error.message));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            clearCart();
        }

        setValidated(true);
    };

    return (
        <Container className="my-5">
            <h1 className="text-start mb-4">Checkout</h1>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Card className="p-4 mb-4 border-0">
                            <h3 className="mb-3">Personal Information</h3>
                            <Row className="mb-3 g-3">

                                <Form.Group as={Col} md="12" controlId="validationName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your surname"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        required
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                    >
                                        <option value="">Choose...</option>
                                        <option>Azerbaijan</option>
                                        <option>Turkey</option>
                                        <option>Saudi Arabia</option>
                                        <option>Pakistan</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                        <option>Italy</option>
                                        <option>Spain</option>
                                        <option>Russia</option>
                                        <option>Ukraine</option>
                                        <option>Georgia</option>
                                        <option>Kazakhstan</option>
                                        <option>Uzbekistan</option>
                                        <option>Turkmenistan</option>
                                        <option>Kyrgyzstan</option>
                                        <option>China</option>
                                        <option>Japan</option>
                                        <option>South Korea</option>
                                        <option>India</option>
                                        <option>Iran</option>
                                        <option>Iraq</option>
                                        <option>Qatar</option>
                                        <option>UAE</option>
                                        <option>Kuwait</option>
                                        <option>Bahrain</option>
                                        <option>Oman</option>
                                        <option>Egypt</option>
                                        <option>Morocco</option>
                                        <option>Algeria</option>
                                        <option>Tunisia</option>
                                        <option>Ethiopia</option>
                                        <option>Nigeria</option>
                                        <option>Kenya</option>
                                        <option>Brazil</option>
                                        <option>Argentina</option>
                                        <option>Mexico</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>New Zealand</option>
                                        <option>Portugal</option>
                                        <option>Sweden</option>
                                        <option>Norway</option>
                                        <option>Finland</option>
                                        <option>Poland</option>
                                        <option>Czech Republic</option>
                                        <option>Slovakia</option>
                                        <option>Hungary</option>
                                        <option>Romania</option>
                                        <option>Bulgaria</option>
                                        <option>Serbia</option>
                                        <option>Croatia</option>
                                        <option>Greece</option>
                                        <option>Netherlands</option>
                                        <option>Belgium</option>
                                        <option>Switzerland</option>
                                        <option>Austria</option>
                                        <option>Singapore</option>
                                        <option>Malaysia</option>
                                        <option>Indonesia</option>
                                        <option>Philippines</option>
                                        <option>Thailand</option>
                                        <option>Vietnam</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Zip code"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationTel">
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control
                                        required
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        name="tel"
                                        value={formData.tel}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                        </Card>
                    </Col>

                    <Col>
                        <div className="p-4 mb-4 border-0">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <img src="https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1/uploads/media/2024/08/24/bKash-050c0ebc9e3a0f1772fbfa9c715790c0.jpg" alt="card1" style={{ height: 50 }} />
                                <img src="https://www.azernews.az/media/2020/07/01/visa_new_logo_240620.jpg" alt="card2" style={{ height: 50 }} />
                                <img src="https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="card2" style={{ height: 50 }} />
                                <img src="https://lh3.googleusercontent.com/KE8W2U_931n24DtWrvySEdKwnx6dLeaoaXBV6nXNHKbJd32mnIx-eaxXPdsRscJMT8vxyLy59XKVkr_UXlswXFJ2KjomzkqV-ud3=s0" alt="card2" style={{ height: 50 }} />
                            </div>


                            <h3 className="mb-3">Payment Details</h3>

                            <Form.Group className="mb-3" controlId="validationCardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter card number"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationExpirationMM">
                                    <Form.Label>Exp. Month</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="MM"
                                        name="expirationMM"
                                        value={formData.expirationMM}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="validationExpirationYY">
                                    <Form.Label>Exp. Year</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="YY"
                                        name="expirationYY"
                                        value={formData.expirationYY}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="validationSecurityCode">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="CVV"
                                        name="cardSecurityCode"
                                        value={formData.cardSecurityCode}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>

                            <div className="fs-3 my-5">
                                <h4>Order Summary</h4>

                                <div className="row border-bottom border-2 my-4">
                                    <div className="col">Subtotal</div>
                                    <div className="col text-end subtotal">${total}</div>
                                </div>

                                <div className="row border-bottom border-2 my-4">
                                    <div className="col">Shipping</div>
                                    <div className="col text-end">FREE</div>
                                </div>

                                <div className="row border-bottom border-2 my-4">
                                    <div className="col">Total</div>
                                    <div className="col text-end total">${total}</div>
                                </div>
                            </div>

                            <Form.Group className="mb-3 mt-3">
                                <Form.Check
                                    required
                                    id="termsCheck"
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting"
                                    feedbackType="invalid"
                                />
                            </Form.Group>

                            <Button variant="danger" type="submit" className="w-100 py-3">
                                Place Order
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
