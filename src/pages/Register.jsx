import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    // ⬇⬇⬇ ВАЖНО: handleSubmit должен быть ВНУТРИ компонента
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === false || !validateForm()) {
            setValidated(true);
            return;
        }

        const { confirmPassword, ...dataToSend } = formData;

        axios.post(`${baseUrl}/auth/register`, dataToSend)
            .then((response) => {
                alert(response.data.message ? `Successful registration: ${response.data.message}` : "Registration completed successfully!");
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/login");
            })
            .catch((error) => {
                if (error.response) {
                    alert(`Registration error: ${error.response.data}`);
                } else if (error.request) {
                    alert("Request error: No response from the server.");
                } else {
                    alert(`Unknown error: ${error.message}`);
                }
            });

        setValidated(true);
    };

    // ⬇⬇⬇ return должен быть внутри Register()
  return (
    <div className="container my-5">
        <div className="row shadow-lg rounded overflow-hidden">

            {/* Левая сторона — картинка */}
            <div className="col-md-6 d-none d-md-block p-0">
                <img
                    src="/images/register.png"
                    alt="register"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            {/* Правая сторона — форма регистрации */}
            <div className="col-md-6 bg-white p-5">
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <h1 className='text-center mb-4'>Create an Account</h1>

                    <Row className='mb-3 g-4'>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="surname"
                                placeholder="Enter your surname"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {error || 'Please provide a valid password'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button className='btn btn-danger w-100' type='submit'>
                        Create Account
                    </Button>

                    <p className='text-center my-2'>
                        <span>Already have an account?</span>
                        <Link className="text-danger mx-3" to={"/login"}>Log in</Link>
                    </p>
                </Form>
            </div>
        </div>
    </div>
);

}
 