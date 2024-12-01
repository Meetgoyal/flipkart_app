import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, changeQuantity, addDiscount, addToCart, calculateTotal, calculateIntialDiscount } from '../reducers/CartListReducer';
const ItemData = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.products.list);
    const cartList = useSelector(state => state.cartlist.items);
    const ProductId = useParams()
    const discount = Math.floor(Math.random() * 50) + 1;
    const ProductData = productList.find(product => Number(product.id) === Number(ProductId.ItemId));
    const getProduct = (ProductId) => {
        return productList.find(product => Number(product.id) === Number(ProductId));
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

    const renderStars = (r) => {
        const fullStar = '★';
        const emptyStar = '☆';
        const fullStarsCount = Math.floor(r);
        const emptyStarsCount = 5 - fullStarsCount;
        let Stars = fullStar.repeat(fullStarsCount);
        Stars += emptyStar.repeat(emptyStarsCount);
        return (
            <div>
                {Stars}
            </div>
        )
    }
    const handleAddCart = (e) => {
        const productId = e.target.dataset.id;
        dispatch(addToCart(productId));
        dispatch(calculateTotal(e.target.dataset.price));
        dispatch(addDiscount({ productId, value: e.target.dataset.disc }));
        dispatch(calculateIntialDiscount({ productId, dis_value: e.target.dataset.disc, price: e.target.dataset.price }));
    }

    return (
        <body class="bg-gray-100 font-sans">
            <main class="container mx-auto px-4 py-8">
                <div class="bg-white rounded-lg shadow-md p-6 flex">
                    <div class="w-1/3">
                        <img
                            src={ProductData.image}
                            alt="Product Image"
                            class="rounded-lg"
                        />
                    </div>

                    {/* Product Details  */}
                    <div class="w-2/3 pl-6">
                        <h2 class="text-2xl font-bold mb-4">{ProductData.title}</h2>
                        <p class="text-gray-700 mb-4">
                            {ProductData.description}
                        </p>
                        <div class="text-lg text-green-600 font-bold mb-4">${ProductData.price}</div>
                        <div class="flex items-center gap-2 mb-4 relative group">
                            <span class="text-yellow-500 text-xl" >{renderStars(ProductData.rating.rate)}</span>
                            <span class="absolute top-[-1.5rem] left-0 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                {ProductData.rating.rate}/5
                            </span>
                            <span class="text-gray-600 text-sm">{"(" + ProductData.rating.count + " Ratings)"}</span>
                        </div>
                        <div>
                            {cartList[ProductData.id] === undefined ?
                                <button
                                    class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                                    onClick={handleAddCart}
                                    data-id={ProductData.id}
                                    data-price={ProductData.price}
                                    data-disc={discount}>
                                    Add to Cart
                                </button> :
                                <div class="flex items-center space-x-2">
                                    <button class="border-1 border-solid border-black-600 text-xl font-bold text-gray-600 hover:text-red-500" onClick={() => handleDecreaseQuantity(ProductData.id)} >-</button>
                                    <input type="text" value={cartList[ProductData.id]} class="border-1 border-solid border-black-600 text-center text-lg font-semibold" onChange={() => HandleChangeQuantity(ProductData.id)} />
                                    <button class="text-xl font-bold text-gray-600 hover:text-green-500" onClick={() => handleIncreaseQuantity(ProductData.id)} >+</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}
export default ItemData;