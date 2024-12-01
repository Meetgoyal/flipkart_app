import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom"
import { loginUser } from "../apicalls/user";
import {message,success} from 'antd';
const LoginPage = () => {
    const navigate =useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const res = await loginUser(formData);
            if(res.success){
                message.success(res.message);
                navigate('/');
            }
            else{
                message.error(res.message);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                {/* <!-- Logo --> */}
                <div class="text-center mb-8">
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="Flipkart Logo" class="h-10 mx-12" />
                    <p class="text-sm text-gray-500 mt-2">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                {/* <!-- Email Input --> */}
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" name="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" onChange={handleChange}/>
                </div>

                {/* <!-- Password Input --> */}
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" name="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" onChange={handleChange}/>
                </div>

                {/* <!-- Login Button --> */}
                <div class="mb-4">
                    <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200" type="submit" >Login</button>
                </div>
                </form>

                {/* <!-- Forgot Password Link --> */}
                <div class="text-right">
                    <a href="#" class="text-blue-500 hover:underline text-sm">Forgot Password?</a>
                </div>

                {/* <!-- Divider --> */}
                <div class="flex items-center justify-center mt-6">
                    <span class="h-px w-full bg-gray-300"></span>
                    <span class="px-3 text-sm text-gray-500">OR</span>
                    <span class="h-px w-full bg-gray-300"></span>
                </div>

                {/* <!-- Create New Account Button --> */}
                <div class="mt-6 text-center">
                    <Link to="/create">
                    <button class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200">
                        Create New Account
                    </button>
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default LoginPage;