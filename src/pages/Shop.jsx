import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        axios
            .get(`${baseUrl}/products/all`)
            .then((response) => {
                setAllProducts(response.data);
                setProducts(response.data);
            })
            .catch((error) => console.log(error.message));
    };

    const addToCart = (product) => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .post(`${baseUrl}/cart/${product.id}?quantity=1`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(() => alert("Product added to cart"))
                .catch(error => console.log(error.message));
        } else {
            alert("Please login to add products to cart");
        }
    };

    const handleProductClick = (product) => {
        navigate(`/products/${product.id}`, { state: { product } });
    };

    const handleCategoryFilter = (category) => {
        setProducts(allProducts.filter(p => p.category === category));
    };

    const handleRateFilter = (rate) => {
        setProducts(allProducts.filter(p => p.rate === rate));
    };

    const handleSortChange = (event) => {
        const order = event.target.value === "1" ? "asc" : "desc";
        setProducts(sortProductsByPrice([...products], order));
    };

    const sortProductsByPrice = (arr, order = "asc") => {
        return arr.sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price));
    };

    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        setSearchTerm(text);

        if (text === "") {
            setProducts(allProducts);
            return;
        }

        const filtered = allProducts.filter((product) => {
            const fullName = `${product.brand} ${product.model}`.toLowerCase();
            return fullName.includes(text);
        });

        setProducts(filtered);
    };

    const getUniqueCategories = () => {
        return [...new Set(allProducts.map(p => p.category))];
    };

    const ShowRate = ({ rate }) => (
        <>
            {[1, 2, 3, 4, 5].map(i => (
                <i
                    key={i}
                    className={`bi bi-star-fill ${i <= rate ? "text-warning" : "text-secondary"}`}
                ></i>
            ))}
        </>
    );

    return (
        <section className="container py-4">

            <h1 className="text-center fw-bold mb-4 display-5">
                🛍️ Shop Page
            </h1>

            <div className="row">

                <div className="col-3">
                    <div className="p-4 rounded-4 shadow-sm bg-white">

                        <input
                            type="search"
                            placeholder="Search..."
                            className="form-control mb-4 rounded-pill px-3 shadow-sm"
                            value={searchTerm}
                            onChange={handleSearch}
                        />

                        <h4 className="fw-bold mb-3">Category</h4>
                        <div className="ps-2 mb-4">
                            {getUniqueCategories().map((category, index) => (
                                <div
                                    key={index}
                                    className="py-2 px-3 mb-1 rounded-3 filter-item"
                                    onClick={() => handleCategoryFilter(category)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>

                        <h4 className="fw-bold mb-3">Rating</h4>
                        <div className="ps-2">
                            {[5, 4, 3, 2, 1].map((rate) => (
                                <div
                                    key={rate}
                                    className="py-2 px-3 mb-1 rounded-3 filter-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleRateFilter(rate)}
                                >
                                    {[...Array(rate)].map((_, i) => (
                                        <i key={i} className="bi bi-star-fill text-warning"></i>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-9">

                    <div className="d-flex gap-3 mb-4">
                        <button className="btn btn-danger px-4 rounded-pill shadow-sm"
                                onClick={getAllProducts}>
                            All Products
                        </button>

                        <select className="form-select w-auto rounded-pill px-3 shadow-sm"
                                onChange={handleSortChange}>
                            <option defaultValue>Sort by</option>
                            <option value="1">Price: Low → High</option>
                            <option value="2">Price: High → Low</option>
                        </select>
                    </div>

                    <div className="row row-cols-2 row-cols-md-3 g-4">

                        {products.map((product, index) => (
                            <div className="col" key={index}>
                                <div className="card border-0 shadow-sm rounded-4 product-card h-100">

                                    <div className="p-3 bg-light rounded-top-4">
                                        <img
                                            src={product.imageUrl}
                                            onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=No+Image"}
                                            className="card-img-top rounded-4 product-img"
                                            alt=""
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleProductClick(product)}
                                        />
                                    </div>

                                    <div className="card-body">
                                        <h5 className="fw-semibold text-truncate">
                                            {product.brand} {product.model}
                                        </h5>

                                        <div className="text-danger fs-4 fw-bold">${product.price}</div>

                                        <div className="mb-3">
                                            <ShowRate rate={product.rate} />
                                            <span className="text-secondary ms-1">
                                                ({product.reviewsCount || Math.floor(Math.random() * 100)})
                                            </span>
                                        </div>

                                        <button
                                            className="btn btn-dark w-100 rounded-pill py-2 shadow-sm"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <style>{`
                .product-card {
                    transition: 0.3s ease;
                }
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;
                }
                .product-img {
                    transition: 0.4s;
                }
                .product-img:hover {
                    transform: scale(1.07);
                }
                .filter-item:hover {
                    background: #f3f3f3;
                    transform: translateX(4px);
                    transition: 0.2s;
                }
            `}</style>

        </section>
    );
}
