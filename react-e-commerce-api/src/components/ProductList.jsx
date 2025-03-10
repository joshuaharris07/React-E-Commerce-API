import axios from "axios";
import { array, func } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Products</h3>
                    <ListGroup>
                        {products.map(product => (
                            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                {product.name} (ID: {product.id})
                                <div>
                                    <Button variant="primary" onClick={() => navigate(`/edit-product/${product.id}`)} className="me-2">Edit</Button>
                                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;