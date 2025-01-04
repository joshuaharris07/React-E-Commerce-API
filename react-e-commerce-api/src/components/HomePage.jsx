import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="text-center">
            <h1>Welcome to the E-Commerce API</h1>
            <p>Use the navigation menu above to move through the application and manage customers, products, and orders.</p>
        </div>
    )
}

export default HomePage;