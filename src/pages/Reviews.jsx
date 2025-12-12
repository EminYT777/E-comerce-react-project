import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      name: "Ilon Musk",
      text: "Absolutely loved the service! Everything was fast, smooth, and beautifully organized.",
      rating: 5,
      date: "2025-11-02",
    },
    {
      name: "Timur Aliev",
      text: "Great experience overall. Friendly team and amazing quality!",
      rating: 4,
      date: "2025-10-20",
    },
    {
      name: "Ali Huseinov",
      text: "Highly recommend! The result exceeded my expectations.",
      rating: 5,
      date: "2025-08-11",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 5,
  });

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const added = {
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([added, ...reviews]);
    setNewReview({ name: "", text: "", rating: 5 });
  };

  return (
    <div className="container py-5">

      <h1 className="fw-bold text-center mb-4">Customer Reviews</h1>

      <Card className="p-3 shadow-sm mx-auto mb-5" style={{ maxWidth: 300 }}>
        <h2 className="text-center fw-bold mb-0">{averageRating.toFixed(1)}</h2>
        <p className="text-center text-warning fs-4">
          {"⭐".repeat(Math.round(averageRating))}
          {"☆".repeat(5 - Math.round(averageRating))}
        </p>
        <p className="text-center text-muted">Average rating</p>
      </Card>

      <Card className="p-4 shadow-sm mb-5 mx-auto" style={{ maxWidth: 600 }}>
        <h4 className="mb-3">Add Your Review</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              placeholder="John Doe"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              placeholder="Write your thoughts..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ⭐
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* REVIEWS LIST */}
      <Row className="g-4">
        {reviews.map((r, index) => (
          <Col md={6} key={index}>
            <Card className="shadow-sm p-3">

              {/* CARD HEADER */}
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ width: 50, height: 50, fontSize: 22 }}
                >
                  {r.name[0]}
                </div>

                <div className="ms-3">
                  <h5 className="mb-1">{r.name}</h5>
                  <small className="text-muted">{formatDate(r.date)}</small>
                </div>
              </div>

              {/* RATING */}
              <div className="text-warning fs-5 mb-2">
                {"⭐".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>

              {/* TEXT */}
              <p className="mb-0" style={{ lineHeight: "1.5" }}>
                {r.text}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
