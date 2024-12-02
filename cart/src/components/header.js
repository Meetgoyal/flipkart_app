import { Outlet, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { changeLogin, setProducts } from "../reducers/ProductListReducer";
import { useEffect, useState } from "react";
const Header = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.products.list);
    const isLogin = useSelector(state => state.products.isLogin);
    const handleSearch = (e) => {
        const text = e.target.value;
        if (text === "") {
            window.location.reload(true);
        }
        else {
            dispatch(setProducts(productList.filter(product => product.title.toLowerCase().includes(text))))
        }
    }

    const handleLogout = () => {
        dispatch(changeLogin());
    }
    return (
        <header class="bg-blue-500 text-white shadow-lg">
            <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* <!-- Logo Section --> */}
                <div class="flex items-center space-x-3">
                    <Link to="/"><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="Flipkart Logo" class="h-8" /></Link>
                </div>
                {/* <!-- Search Bar --> */}
                <div class="flex-grow max-w-lg mx-4">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        class="w-full px-4 py-2 rounded focus:outline-none text-black"
                        onChange={handleSearch}
                    />
                </div>

                {/* <!-- Account and Cart Section --> */}
                <div class="flex items-center space-x-6">
                    {isLogin ? <button class="text-white font-semibold" onClick={handleLogout}>Logout</button> : <Link to="/login"><button class="text-white font-semibold">Login</button></Link>}
                    <div class="relative">
                        <button class="flex items-center space-x-1">
                            <Link to="/cart"><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" /></Link>
                            <Link to="/cart"><span className="flex items-center space-x-1">Cart</span></Link>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;