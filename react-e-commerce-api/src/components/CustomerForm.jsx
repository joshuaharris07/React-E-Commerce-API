import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from "prop-types";
import { Form, Button, Alert, Modal, Spinner, FormGroup } from "react-bootstrap";
import axios from "axios";

const CustomerForm = () => {
    const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name = 'Customer name is required';
        if (!customer.phone) errors.phone = 'Customer phone number is required';
        if (!customer.email) errors.email = 'Customer email is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try{
            if (id) {
                await axios.put(`http://127.0.0.1:5000/edit-customer/${id}`, customer);
            }  else {
                await axios.post(`http://127.0.0.1:5000/add-customer`, customer)
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({ name: '', phone: '', email: '' });
        setSubmitting(false);
        navigate('/customers');
    };

    if (isSubmitting) return <p>Submitting customer data...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Edit' : 'Add'} Customer</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <FormGroup controlId="customerName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="customerPhone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="tel" name="phone" value={customer.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="customerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={customer.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </FormGroup>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer has been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="seconday" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

CustomerForm.propTypes = {
    selectedCustomer: object,
    onCustomerUpdated: func
}

export default CustomerForm;