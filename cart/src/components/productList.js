import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setOriginalProducts, setProducts } from '../reducers/ProductListReducer';
import { increaseQuantity, decreaseQuantity, changeQuantity, addDiscount, addToCart, calculateTotal, calculateIntialDiscount } from '../reducers/CartListReducer';
const ProductList = () => {
    const productsData = useSelector(state => state.products.list);
    const cartData = useSelector(state => state.cartlist.items);
    const dispatch = useDispatch();
    let discount = 0;
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => dispatch(setProducts(json)))
    }, [])
    const handleAddCart = (e) => {
        const productId = e.target.dataset.id;
        dispatch(addToCart(productId));
        dispatch(calculateTotal(e.target.dataset.price));
        dispatch(addDiscount({ productId, value: e.target.dataset.disc }));
        dispatch(calculateIntialDiscount({ productId, dis_value: e.target.dataset.disc, price: e.target.dataset.price }));

    };
    const getProduct = (ProductId) => {
        return productsData.find(product => Number(product.id) === Number(ProductId));
    };
    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity({ id, price: getProduct(id).price }));
    };
    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity({ id, price: getProduct(id).price }));
    };
    const HandleChangeQuantity = (id) => (e) => {
        dispatch(changeQuantity({ id, value: e.target.value }));
    };
    return (
        <div>
            <div class="container mx-auto px-4 py-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        productsData.map(product => (
                            discount = Math.floor(Math.random() * 50) + 1,
                            // product detail
                            <div class="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300">
                                <Link to={`/item/${product.id}`}>
                                    <div class="p-4">
                                        <img src={product.image} alt="Product Name" class="w-full h-64 object-cover rounded-t-lg object-fill" />
                                    </div>
                                    <div class="p-4 space-y-2">
                                        <h3 class="text-gray-800 font-semibold text-lg">{product.title}</h3>
                                        <p className="text-ellipsis h-12 overflow-hidden text-gray-700">{product.description}</p>
                                        <div class="text-xl font-bold text-blue-600">{product.price}</div>
                                        <div class="text-green-600 text-sm font-medium">{discount}% off</div>
                                    </div>
                                </Link>
                                <div class="p-4">
                                    {cartData[product.id] === undefined ?
                                        <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300"
                                            onClick={handleAddCart}
                                            data-id={product.id}
                                            data-price={product.price}
                                            data-disc={discount}>
                                            Add
                                        </button> :
                                        <div class="flex items-center space-x-2">
                                            <button class="border-1 border-solid border-black-600 text-xl font-bold text-gray-600 hover:text-red-500" onClick={() => handleDecreaseQuantity(product.id)} >-</button>
                                            <input type="text" value={cartData[product.id]} class="border-1 border-solid border-black-600 text-center text-lg font-semibold" onChange={() => HandleChangeQuantity(product.id)} />
                                            <button class="text-xl font-bold text-gray-600 hover:text-green-500" onClick={() => handleIncreaseQuantity(product.id)} >+</button>
                                        </div>}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ProductList;