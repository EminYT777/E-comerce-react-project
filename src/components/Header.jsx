import { Link } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";

export default function Header() {
    const { user, getUserAccount, logoutUser } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        getUserAccount();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
    };

    function renderProfileMenu() {
        if (user) {
            return (
                <Nav className="ms-3 d-flex align-items-center gap-3">
                    <Link to="/cart" className="fs-3 text-dark">
                        <i className="bi bi-cart3"></i>
                    </Link>

                    <NavDropdown
                        title={<i className="bi bi-person-circle fs-2 text-dark"></i>}
                        id="profile-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item as={Link} to="/profile">
                            <i className="bi bi-person"></i> Manage My Account
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/user-products">
                            <i className="bi bi-box"></i> User products
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/reviews">
                            <i className="bi bi-star"></i> My Reviews
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </NavDropdown.Item>
                    </NavDropdown>

                    {/* Аккуратный username */}
                    <span style={{
                        fontWeight: "600",
                        color: "#000",
                        fontSize: "16px",
                        marginLeft: "5px",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: "#f3f3f3"
                    }}>
                        {user.username}
                    </span>
                </Nav>
            );
        } else {
            return (
                <Nav className="ms-3">
                    <Button as={Link} to="/login" variant="outline-danger">
                        Log in
                    </Button>
                </Nav>
            );
        }
    }

    return (
        <header>
            <div className="text-light bg-danger">
                <p className="text-center p-3">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                    <Link
                        to="/shop"
                        className="fw-bold mx-2 px-3 py-1 rounded"
                        style={{ background: "white", color: "black" }}
                    >
                        Shop now
                    </Link>
                </p>
            </div>

            <Navbar expand="lg" className="bg-light px-3">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={"/"} style={{ fontWeight: "700", color: "#000", textDecoration: "none" }}>
                            E-commerce
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 d-flex align-items-center gap-3" navbarScroll>
                            <Link to="/" style={{ color: "#000", textDecoration: "none" }}>Home</Link>
                            <Link to="/contact" style={{ color: "#000", textDecoration: "none" }}>Contact</Link>
                            <Link to="/about" style={{ color: "#000", textDecoration: "none" }}>About</Link>
                            {!user && <Link to="/register" style={{ color: "#000", textDecoration: "none" }}>Sign up</Link>}
                            {/* Красная кнопка Shop */}
                            <Button as={Link} to="/shop" variant="danger">
                                Shop
                            </Button>
                        </Nav>

                        <Form className="d-flex me-3">
                            <Form.Control
                                type="search"
                                placeholder="What are you looking for?"
                                className="me-2"
                                aria-label="Search"
                                style={{ borderColor: "red" }} // рамка поиска красная
                            />
                            <Button type="submit" variant="danger">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form>


                        {renderProfileMenu()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
