import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Product() {
    const { state } = useLocation();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        if (state?.product) {
            setProduct(state.product);
        }
        setIsLoading(false);
    }, [state]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            showNotification('Please log in to add items to your cart', 'error');
            return;
        }

        if (!product?.id) {
            showNotification('Product information is incomplete', 'error');
            return;
        }

        setIsLoading(true);

        fetch(`${baseUrl}/cart/${product.id}?quantity=1`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add to cart');
                return response.json();
            })
            .then(() => showNotification('Product added to cart', 'success'))
            .catch(error => showNotification(`Error: ${error.message}`, 'error'))
            .finally(() => setIsLoading(false));
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    if (isLoading && !product) {
        return <div className="container my-5 text-center">Loading product details...</div>;
    }

    if (!product) {
        return <div className="container my-5 text-center">Product not found.</div>;
    }

    return (
        <section className="container my-5">
            <h1 className="fs-4 fw-bold mb-4 text-uppercase tracking-wide">Product Details</h1>

            <div className="row shadow-lg rounded overflow-hidden bg-white">
                <div className="col-md-7 p-4 bg-light d-flex align-items-center justify-content-center">
                    <img
                        className="w-100 rounded shadow-sm hover-scale"
                        src={product.imageUrl || "https://via.placeholder.com/500x500?text=No+Image"}
                        alt={product.model}
                        style={{ objectFit: "contain", maxHeight: "500px" }}
                    />
                </div>

                <div className="col-md-5 p-4">
                    <h3 className="fw-bold">{product.brand} {product.model}</h3>

                    <div className="text-warning mb-2 fs-5 d-flex align-items-center">
                        {[1, 2, 3, 4].map(i => <i key={i} className="bi bi-star-fill"></i>)}
                        <i className="bi bi-star"></i>
                        <span className="text-secondary ms-2">(150 reviews)</span>
                    </div>

                    <p className="fs-2 fw-bold text-dark">${product.price}</p>
                    <p className="text-secondary lh-lg">{product.description}</p>

                    <button
                        className="btn btn-dark w-100 py-3 fw-semibold mt-3 shadow-sm hover-lift"
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Add to cart'}
                    </button>

                    {notification.show && (
                        <div className={`alert mt-3 ${notification.type === 'error' ? 'alert-danger' : 'alert-success'}`}> 
                            {notification.message}
                        </div>
                    )}

                    <div className="mt-4 p-3 border rounded d-flex gap-3 bg-light shadow-sm">
                        <i className="bi bi-box fs-2 text-dark"></i>
                        <div>
                            <h5 className="mb-1">Free Delivery</h5>
                            <p className="fw-medium mb-0 text-decoration-underline">Enter your postal code for Delivery Availability</p>
                        </div>
                    </div>

                    <div className="mt-3 p-3 border rounded d-flex gap-3 bg-light shadow-sm">
                        <i className="bi bi-arrow-counterclockwise fs-2 text-dark"></i>
                        <div>
                            <h5 className="mb-1">Return Delivery</h5>
                            <p className="fw-medium mb-0 text-decoration-underline">Free 30 Days Delivery Returns. Details</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

