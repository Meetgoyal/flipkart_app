import logo from './logo.svg';
import './App.css';
import ProductList from './components/productList';
import CartList from './components/cartList';
import Header from './components/header';
import LoginPage from './components/loginPage';
import ItemPage from './components/ItemData';
import PlacePage from './components/placeOrder';
import CreatePage from './components/createAcoountPage';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/cart' element={<CartList/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path={`/item/:ItemId`} element={<ItemPage/>}/>
      <Route path='/final' element={<PlacePage/>}/>
      <Route path='/create' element={<CreatePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
