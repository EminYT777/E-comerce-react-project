import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const getAllProducts = () => {
    const token = localStorage.getItem('token');
    axios.get(`${baseUrl}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const products = response.data;
        setProducts(products);
      })
      .catch((error) => {
        setError("Ошибка при получении списка продуктов");
        console.error("Ошибка при получении списка продуктов:", error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleImageClick = (imageUrl) => {
    document.querySelector('.imageInModal').src = imageUrl;
  };
  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
      axios.delete(`${baseUrl}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          alert("Продукт успешно удалён!");
          getAllProducts();
        })
        .catch((error) => {
          console.error("Ошибка при удалении продукта:", error);
          alert("Ошибка при удалении продукта");
        });
    }
  };

  const handleEdit = (product) => {
    sessionStorage.setItem("product", JSON.stringify(product));
    sessionStorage.setItem("formMode", "editProduct");
    navigate("/product-form");
  };

  const handleAddNewProduct = () => {
    sessionStorage.setItem("formMode", "addNewProduct");
    navigate("/product-form");
  };

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }
  return (
    <section className="container my-4">
      <div>
        <button
          className="btn btn-primary addNewProductBtn"
          onClick={handleAddNewProduct}
        >
          New Product
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Rate</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.brand}</td>
              <td>{product.model}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.imageUrl}
                  className="imageInTable"
                  width="200"
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
                  onClick={() => handleImageClick(product.imageUrl)}
                  alt="Product"
                />
              </td>
              <td>{product.price} $</td>
              <td>{product.rate}/5</td>

              <td>
                <button
                  className="btn btn-primary mx-2 edit-btn"
                  onClick={() => handleEdit(product)}
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  );
};

export default UserProducts;
