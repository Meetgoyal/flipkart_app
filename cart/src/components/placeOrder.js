import { useSelector } from "react-redux";
const PlaceOrder = () => {
    const Total_price = useSelector(state => state.cartlist.total_price);
    let final_discount =useSelector(state => state.cartlist.total_discount);
    return (
        <main class="container mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow-lg p-8 text-center max-w-lg mx-auto">
                <div class="text-green-500 text-6xl mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>

                <h2 class="text-2xl font-bold mb-2 text-gray-800">Thank You for Your Purchase!</h2>
                <p class="text-gray-700 mb-6">Your order has been successfully placed.</p>

                <div class="bg-gray-100 p-4 rounded-lg text-left mb-6">
                    <p><span class="font-semibold">Order ID:</span>{Math.floor(10000000 + Math.random() * 90000000)}</p>
                    <p><span class="font-semibold">Estimated Delivery:</span> Tue, Dec 5, 2024</p>
                    <p><span class="font-semibold">Total Amount:{(Total_price-final_discount) >0 ? (Total_price-final_discount) : 0 }</span></p>
                </div>

                {/* Suggested Next Steps */}
                <p class="text-gray-600 mb-4">What would you like to do next?</p>
                <div class="flex justify-center gap-4">
                    <a
                        href="/"
                        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                        Go to Homepage
                    </a>
                </div>
            </div>
        </main>
    )
}
export default PlaceOrder;