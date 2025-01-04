import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import OrderList from "./components/OrderList";
import PlaceOrder from "./components/PlaceOrder";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <Container fluid className='p-0 fixed-top'>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/add-customer' element={<CustomerForm />} />
          <Route path='/edit-customer/:id' element={<CustomerForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/edit-product/:id' element={<ProductForm />} />
          <Route path='/orders' element={<OrderList />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
  );
};

export default App;
