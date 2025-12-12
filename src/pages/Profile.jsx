import React, { useContext, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";

const Profile = () => {
  const navigate = useNavigate();

  // Берём данные пользователя из AuthContext
  const { user, getUserAccount } = useContext(AuthContext);

  // При загрузке страницы — получаем информацию
  useEffect(() => {
    getUserAccount();
  }, []);

  return (
    <Container style={{ maxWidth: "900px" }} className="mt-5">

      <Button
        variant="danger"
        className="mb-4"
        onClick={() => navigate("/user-products")}
      >
        My products for sale
      </Button>

      <Card className="shadow-sm p-4">

        <h3 style={{ color: "#d9534f", marginBottom: "20px" }}>
          User Details
        </h3>

        {!user ? (
          <p style={{ fontSize: "20px" }}>Loading user...</p>
        ) : (
          <>
            <p style={{ fontSize: "20px" }}>
              <strong>Name: </strong> {user.name}
            </p>

            <p style={{ fontSize: "20px" }}>
              <strong>Surname: </strong> {user.surname}
            </p>

            <p style={{ fontSize: "20px" }}>
              <strong>Email: </strong> {user.email}
            </p>

            <p style={{ fontSize: "20px" }}>
              <strong>Username: </strong> {user.username}
            </p>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
