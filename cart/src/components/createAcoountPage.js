import {useState} from 'react'
import { registerUser } from '../apicalls/user';
import {message,success,error} from 'antd';
import { useNavigate } from 'react-router-dom';
const CreatePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
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
            const res = await registerUser(formData);
            if(res.success){
                message.success(res.message);
                navigate("/login");
            }
            else{
                message.error(res.message);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <body class="bg-gray-100">
            {/* <!-- Main Container --> */}
            <div class="min-h-screen flex items-center justify-center ">

                <div class="bg-white shadow-md rounded-lg max-w-xl w-full">
                    <div class="bg-blue-600 text-white text-center py-4 rounded-t-lg">
                        <h1 class="text-xl font-semibold">Create an Account</h1>
                    </div>

                    <form class="p-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" onChange={handleChange}
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div>
                            <label for="mobile" class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="phone" name="mobile" placeholder="Enter your phone number" onChange={handleChange}
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" placeholder="Create a password" onChange={handleChange}
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <button type="submit"
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md">
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* <!-- Footer --> */}
                    <div class="text-center p-4 text-gray-600">
                        Already have an account?
                        <a href="/login" class="text-blue-600 hover:underline">Log In</a>
                    </div>
                </div>
            </div>

        </body>
    )
}
export default CreatePage;