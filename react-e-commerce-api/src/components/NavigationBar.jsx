import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
    return (
        <Navbar bg="primary" expand="md"> 
            <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto d-flex align-items-center">
                    <Nav.Link as={NavLink} to="/" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-customer" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Add Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-product" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Add Product
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Orders
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/place-order" activeclassname="active" className="mx-2 px-3 py-2 rounded font-weight-bold">
                    Place Order
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;