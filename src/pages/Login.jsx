import { useState, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Login() {

    const { getUserAccount } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const validateForm = () => {
        if (formData.password.length < 2) {
            setError('Password must be at least 2 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === false || !validateForm()) {
            setValidated(true);
            return;
        }

        axios.post(`${baseUrl}/auth/login`, formData)
            .then((response) => {
                if (!response.data) {
                    throw new Error('No token received');
                }

                alert("Login successful!");
                localStorage.setItem("token", response.data);
                getUserAccount();

                setFormData({ username: '', password: '' });

                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    alert(`Login error: ${error.response.data}`);
                } else if (error.request) {
                    alert("Request error: No response from the server.");
                } else {
                    alert(`Unknown error: ${error.message}`);
                }
            });

        setValidated(true);
    };

   return (
    <div className="container my-5">
        <div className="row shadow-lg rounded overflow-hidden">

            {/* Левая сторона — картинка */}
            <div className="col-md-6 d-none d-md-block p-0">
                <img
                    src="/images/register.png"
                    alt="login"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            {/* Правая сторона — форма логина */}
            <div className="col-md-6 bg-white p-5">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1 className='text-center mb-4'>Login</h1>

                    <Row className="mb-3 g-4">
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
                                minLength={2}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {error || 'Please provide a valid password'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button className='btn btn-danger w-100' type='submit'>
                        Log in
                    </Button>

                    <p className='text-center my-2'>
                        <span>Don’t have an account?</span>
                        <Link className="text-danger mx-3" to={"/register"}>Sign up</Link>
                    </p>
                </Form>
            </div>
        </div>
    </div>
);

}
