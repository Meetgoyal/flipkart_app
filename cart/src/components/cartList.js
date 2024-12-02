import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../reducers/ProductListReducer';
import { calculateTotal, changeQuantity, decreaseQuantity, increaseQuantity, removeFromCart } from '../reducers/CartListReducer';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'
const CartList = () => {
    const navigate = useNavigate();
    const onToken = (token) => {
        navigate('/final');
    }
    const cartData = useSelector(state => state.cartlist.items);
    const Total_price = Math.floor(useSelector(state => state.cartlist.total_price));
    const productList = useSelector(state => state.products.list);
    const DisList = useSelector(state => state.cartlist.discount);
    const isLogin = useSelector(state => state.products.isLogin);
    let final_discount = Math.floor(useSelector(state => state.cartlist.total_discount));
    const dispatch = useDispatch();
    const getProduct = (ProductId) => {
        return productList.find(product => Number(product.id) === Number(ProductId));
    }
    const handleRemoveItem = (e) => {
        dispatch(removeFromCart(e.target.dataset.id));
    }
    const handleQuantityChange = (id) => (e) => {
        if (e.target.dataset.type == "INC") {
            dispatch(increaseQuantity({ id, price: getProduct(id).price }));

        }
        else {
            dispatch(decreaseQuantity({ id, price: getProduct(id).price }));
        }
    }
    const handleQuantity = (id) => (e) => {
        dispatch(changeQuantity({ id, value: e.target.value }))
    }
    return (
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products section */}
                <div class="lg:col-span-2 space-y-6">
                    {
                        Object.keys(cartData).map(id => (
                            <div class="bg-white border rounded-lg shadow-md p-4 flex space-x-4">
                                <img src={getProduct(id).image} alt="Product Name" class="w-24 h-24 object-cover rounded object-fill" />
                                <div class="flex-grow">
                                    <h3 class="text-gray-800 font-semibold text-lg">{getProduct(id).title}</h3>
                                    <div class="text-sm text-gray-600">Seller: Retailer Name</div>
                                    <div class="flex items-center space-x-4 mt-3">
                                        <div class="flex items-center border rounded">
                                            <button class="px-2 py-1 text-gray-500" data-type="DEC" onClick={handleQuantityChange(id)}>-</button>
                                            <input type="text" value={cartData[id]} class="w-10 text-center border-l border-r focus:outline-none" onChange={handleQuantity(id)} />
                                            <button class="px-2 py-1 text-gray-500" data-type="INC" onClick={handleQuantityChange(id)}>+</button>
                                        </div>
                                        <button class="text-blue-500 hover:underline" data-id={id} onClick={handleRemoveItem}>Remove</button>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xl font-bold text-blue-600">{getProduct(id).price}</div>
                                    <div class="text-sm text-green-600">{DisList[id]}% off</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Price summary Section */}
                <div class="bg-white border rounded-lg shadow-md p-6 space-y-4">
                    <h2 class="text-lg font-semibold text-gray-800">Price Details</h2>

                    <div class="space-y-2">
                        <div class="flex justify-between text-gray-600">
                            <span>Price ({Object.keys(cartData).length} items)</span>
                            <span>{Total_price > 0 ? Total_price : 0}</span>
                        </div>
                        <div class="flex justify-between text-gray-600">
                            <span>Discount</span>
                            <span class="text-green-600">{final_discount > 0 ? final_discount : 0}</span>
                        </div>
                        <div class="flex justify-between text-gray-600">
                            <span>Delivery Charges</span>
                            <span class="text-green-600">Free</span>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        <div class="flex justify-between text-xl font-semibold text-gray-800">
                            <span>Total Amount</span>
                            <span>{(Total_price - final_discount) > 0 ? (Total_price - final_discount) : 0}</span>
                        </div>
                    </div>
                    {isLogin ?
                        <StripeCheckout token={onToken} currency='INR' amount={(Total_price - final_discount) * 100 > 0 ? (Total_price - final_discount) * 100 : 0} stripeKey='pk_test_51QRDITRp2vso8K5A1yz6HziVSgFXEtArYsHD5kroIdaIxX0IsB6qgDxXVqVPTY7FEhAeValiD3gXnD0LBtFoptc200kGlbeX5X'><button class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition duration-300">
                            Pay
                        </button></StripeCheckout> : <Link to={"/login"}><button class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition duration-300">
                            Proceed
                        </button></Link>}
                </div>
            </div>
        </div>
    )
}
export default CartList;