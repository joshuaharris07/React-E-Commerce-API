import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
            fetchOrders();
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <h3>Orders</h3>
            <Row>
                <Col>
                    <ListGroup>
                        {orders.map(order => (
                            <ListGroup.Item key={order.id}>
                                <div>
                                    <strong>Order ID:</strong> {order.id} <br />
                                    <strong>Order Date:</strong> {order.date} <br />
                                    <strong>Products:</strong> <br />
                                    {order.products.map((product) => (
                                        <li key={product.id}>
                                        {product.name} (${product.price.toFixed(2)})
                                    </li>
                                    ))}
                                    
                                </div>
                                <div>
                                    {/* <Button variant="primary" onClick={() => navigate(`/edit-order/${order.id}`)} className="me-2">Edit</Button> Can look at adding this functionality later if desired. */}
                                    <Button variant="danger" onClick={() => deleteOrder(order.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderList;