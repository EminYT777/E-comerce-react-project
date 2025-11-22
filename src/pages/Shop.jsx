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
        axios.get(`${baseUrl}/products/all`)
            .then((response) => {
                setAllProducts(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const addToCart = (product) => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post(`${baseUrl}/cart/${product.id}?quantity=1`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    alert("Product added to cart");
                })
                .catch(error => console.log(error.message));
        } else {
            alert("Please login to add products to cart");
        }
    };

    const handleProductClick = (product) => {
        navigate(`/products/${product.id}`, {
            state: { product }
        });
    };

    const handleCategoryFilter = (category) => {
        const filtered = allProducts.filter(product => product.category === category);
        setProducts(filtered);
    };

    const handleRateFilter = (rate) => {
        const filtered = allProducts.filter(product => product.rate === rate);
        setProducts(filtered);
    };

    const handleSortChange = (event) => {
        const order = event.target.value === "1" ? "asc" : "desc";
        const sorted = sortProductsByPrice([...products], order);
        setProducts(sorted);
    };

    const sortProductsByPrice = (arr, order = "asc") => {
        return arr.sort((a, b) => {
            if (order === "asc") return a.price - b.price;
            return b.price - a.price;
        });
    };

    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        setSearchTerm(text);

        if (text === "") {
            setProducts(allProducts);
            return;
        }

        const filtered = allProducts.filter((product) => {
            const fullName = (product.brand + " " + product.model).toLowerCase();
            return fullName.includes(text);
        });

        setProducts(filtered);
    };

    const getUniqueCategories = () => {
        const categories = allProducts.map(p => p.category);
        return [...new Set(categories)];
    };

    const ShowRate = ({ rate }) => {
        return (
            <>
                {[1, 2, 3, 4, 5].map(i => (
                    <i
                        key={i}
                        className={`bi bi-star-fill ${i <= rate ? "text-warning" : "text-secondary"}`}
                    ></i>
                ))}
            </>
        );
    };

    return (
        <section className="container my-4">
            <h1 className="my-3">Shop</h1>

            <div className="row">

                {/* FILTERS LEFT SIDE */}
                <div className="col-2">

                    <input
                        type="search"
                        placeholder="Search..."
                        className="form-control mb-3 w-100"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    {/* CATEGORY */}
                    <div className="border-bottom my-3 py-2">
                        <h3>Category</h3>
                        <div className="ps-3 fw-bold fs-5">
                            {getUniqueCategories().map((category, index) => (
                                <div
                                    key={index}
                                    className="my-1"
                                    onClick={() => handleCategoryFilter(category)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RATE */}
                    <div className="border-bottom my-3 py-2">
                        <h3>Rate</h3>
                        <div className="ps-3 fw-bold fs-5">
                            {[5, 4, 3, 2, 1].map((rate) => (
                                <div
                                    key={rate}
                                    className="my-2"
                                    onClick={() => handleRateFilter(rate)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {[...Array(rate)].map((_, i) => (
                                        <i key={i} className="bi bi-star-fill text-warning"></i>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* PRODUCTS RIGHT SIDE */}
                <div className="col-10">

                    <div className="w-25 mb-3">
                        <button
                            className="btn btn-danger mb-2"
                            onClick={getAllProducts}
                        >
                            All Products
                        </button>

                        <select className="form-select" onChange={handleSortChange}>
                            <option defaultValue>Sort by</option>
                            <option value="1">Price: Low → High</option>
                            <option value="2">Price: High → Low</option>
                        </select>
                    </div>

                    {/* PRODUCT CARDS */}
                    <div className="row row-cols-2 row-cols-md-4 g-4">

                        {products.map((product, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100 border-0">

                                    <div className="bg-light p-3">
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top"
                                            alt={`${product.brand} ${product.model}`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleProductClick(product)}
                                        />
                                    </div>

                                    <div className="card-body">
                                        <h6 className="card-title">
                                            {product.brand} {product.model}
                                        </h6>

                                        <div className="text-danger">
                                            {product.price}$
                                        </div>

                                        <div>
                                            <ShowRate rate={product.rate} />
                                            <span className="text-secondary">
                                                ({product.reviewsCount || Math.floor(Math.random() * 100)})
                                            </span>
                                        </div>

                                        <button
                                            className="btn btn-dark w-100 my-2"
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
        </section>
    );
}
