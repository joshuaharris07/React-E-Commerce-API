import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CustomerForm from "./components/CustomerForm";
import CustomerFormWrapper from "./components/CustomerFormWrapper";
import CustomerList from "./components/CustomerList";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import './App.css'

const App = () => {
  return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/add-customer' element={<CustomerForm />} />
          <Route path='/edit-customer/:id' element={<CustomerForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/edit-product/:id' element={<ProductForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
  );
};

export default App;
