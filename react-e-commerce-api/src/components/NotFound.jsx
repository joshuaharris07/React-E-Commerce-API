import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NotFound() {
    return (
        <Container className="bg-light text-center mt-5">
            <Row className="align-items-center">
                <Col md={6}>
                    <Image 
                        src="/images/page404.png" 
                        alt="Not Found" 
                        fluid 
                        className="rounded m-4"
                    />
                </Col>
                <Col md={6}>
                    <h2 className="text-danger">404 - Not Found</h2>
                    <p className="text-muted">
                        Oops! The page you are looking for does not exist. It might have been moved or removed.
                    </p>
                    <Button 
                        variant="primary" 
                        as={NavLink} 
                        to="/" 
                        className="mt-3"
                    >
                        Return to Home
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;