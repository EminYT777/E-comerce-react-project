import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // ← новое состояние
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return navigate('/login');
        fetchCart();
    }, [user]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            const { data } = await axios.get(`${baseUrl}/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(Array.isArray(data) ? data : []);
        } catch {
            navigate('/login');
        }
    };

    const updateCart = async (id, qty) => {
        if (qty < 1 || qty > 99) return;
        try {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');
            await axios.put(`${baseUrl}/cart/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { quantity: qty },
            });
            fetchCart();
        } catch (err) { }
    };

    const removeFromCart = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');
            await axios.delete(`${baseUrl}/cart/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch { }
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    const handleQuantityChange = (e, id) => {
        const qty = parseInt(e.target.value, 10);
        if (!isNaN(qty)) updateCart(id, qty);
    };

    const handleCheckout = () => {
        if (!cartItems.length) return alert("Your cart is empty");
        navigate('/checkout');
    };

    return (
        <section className="container my-4">

            <h1 className="fs-3 mb-4">Cart</h1>

            {!cartItems.length ? (
                <div className="alert alert-info">
                    Your cart is empty. <Link to="/shop">Continue shopping</Link>
                </div>
            ) : (
                <>
                    <table className="table table-borderless">
                        <thead>
                            <tr className="shadow">
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="list">
                            {cartItems.map((item) => (
                                <tr className="shadow cart-row" key={item.productId}>
                                    <td>
                                        <img
                                            width="100px"
                                            className="cart-img"
                                            style={{ cursor: "pointer" }}
                                            src={item.imageUrl || "/default-product.jpg"}
                                            alt={`${item.brand || "Unknown"} ${item.model || "Unknown"}`}
                                            onClick={() => setSelectedItem(item)}   // ← открываем модалку
                                        />

                                        <span style={{ marginLeft: "10px" }}>
                                            {item.brand} {item.model}
                                        </span>
                                    </td>

                                    <td>${item.price}</td>

                                    <td>
                                        <input
                                            className="form-control quantity-input"
                                            type="number"
                                            min="1"
                                            max="99"
                                            style={{ width: "60px" }}
                                            value={item.quantity || 1}
                                            onChange={(e) => handleQuantityChange(e, item.productId)}
                                        />
                                    </td>

                                    <td>${(item.price || 0) * (item.quantity || 1)}</td>

                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeFromCart(item.productId)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* TOTAL BLOCK */}
                    <div className="row my-5">
                        <div className="col-8"></div>

                        <div className="col-4">
                            <div className="border border-3 border-dark p-4 rounded bg-light shadow-lg">
                                <h3 className="text-center mb-4 fw-bold">Order Summary</h3>

                                <div className="d-flex py-3 justify-content-between border-bottom border-2">
                                    <div>Subtotal</div>
                                    <div className="fw-bold">${totalPrice}</div>
                                </div>

                                <div className="d-flex py-3 justify-content-between border-bottom border-2">
                                    <div>Shipping</div>
                                    <div className="text-success fw-bold">Free</div>
                                </div>

                                <div className="d-flex py-3 justify-content-between">
                                    <div className="fw-bold fs-4">Total</div>
                                    <div className="fw-bold fs-4 text-danger">${totalPrice}</div>
                                </div>

                                <div className="text-center mt-4">
                                    <Button
                                        variant="danger"
                                        className="p-3 px-5 fs-5 fw-bold"
                                        onClick={handleCheckout}
                                    >
                                        Proceed to checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

            {/* ===================== MODAL ===================== */}
            <Modal show={!!selectedItem} onHide={() => setSelectedItem(null)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>

                {selectedItem && (
                    <Modal.Body>

                        <div className="row">
                            <div className="col-6">
                                <img
                                    src={selectedItem.imageUrl}
                                    alt="Product"
                                    className="img-fluid rounded shadow"
                                />
                            </div>

                            <div className="col-6">
                                <h4>{selectedItem.brand} {selectedItem.model}</h4>
                                <p className="mt-3"><b>Price:</b> ${selectedItem.price}</p>
                                <p><b>Quantity:</b> {selectedItem.quantity}</p>
                                <p><b>Total:</b> ${selectedItem.price * selectedItem.quantity}</p>
                            </div>
                        </div>

                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedItem(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </section>
    );
}
