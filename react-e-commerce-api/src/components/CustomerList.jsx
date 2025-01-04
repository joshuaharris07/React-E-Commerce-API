import axios from "axios";
import { array, func } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customers</h3>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                {customer.name} (ID: {customer.id})
                                <div>
                                    <Button variant="primary" onClick={() => navigate(`/edit-customer/${customer.id}`)} className="me-2">Edit</Button>
                                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerList;