import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Spinner, Modal, FormGroup } from "react-bootstrap";

const PlaceOrder = () => {
    const [order, setOrder] = useState({ date: '', customer_id: '', product_ids: [] });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch customers and products for dropdowns
        axios.get("http://127.0.0.1:5000/customers")
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));

        axios.get("http://127.0.0.1:5000/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!order.date) errors.date = 'Order date is required';
        if (!order.customer_id) errors.customer_id = 'Customer is required';
        if (order.product_ids.length === 0) errors.product_ids = 'Must select at least one product';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleProductSelection = (event) => {
        const { options } = event.target;
        const selected = Array.from(options)
            .filter(option => option.selected)
            .map(option => parseInt(option.value));
        setOrder(prevOrder => ({
            ...prevOrder,
            product_ids: selected
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            await axios.post("http://127.0.0.1:5000/place-order", order);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ date: '', customer_id: '', product_ids: [] });
        setSubmitting(false);
        navigate("/orders");
    };

    if (isSubmitting) return <p>Processing order data...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Place Order</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <FormGroup controlId="orderDate">
                    <Form.Label>Order Date:</Form.Label>
                    <Form.Control type="date" name="date" value={order.date} onChange={handleChange} isInvalid={!!errors.date} />
                    <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="customerSelect">
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control as="select" name="customer_id" value={order.customer_id} onChange={handleChange} isInvalid={!!errors.customer_id}>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.customer_id}</Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="productSelect">
                    <Form.Label>Products:</Form.Label>
                    <Form.Control as="select" multiple value={order.product_ids} onChange={handleProductSelection} isInvalid={!!errors.product_ids}>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.product_ids}</Form.Control.Feedback>
                </FormGroup>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order has been placed successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PlaceOrder;