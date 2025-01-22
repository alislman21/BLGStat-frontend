import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function Submit(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const res = await axios.post('http://localhost:5000/api/v1/login', formLogin);

            // If login is successful, store the JWT token and set isAuthenticated flag
            const token = res.data.token;
            const id = res.data.id
            localStorage.setItem('token', token); // Store the token in localStorage
            localStorage.setItem('isAuthenticated', 'true'); // Set isAuthenticated flag
            localStorage.setItem('id', id);
        
            setSuccess(true);

            navigate('/profile'); // Redirect to home page
        } catch (err) {
            console.log(err);
            setError('Login failed, Please try again');
        }
    }

    return (
        <div className="font-sans flex items-center justify-center flex-col w-full h-full">
            <header className="w-full flex justify-between items-center bg-gray-100">
                <div className="w-1/4 flex items-center m-3">
                    <img className="w-9" src="/assets/icons/icons8-statistics-50.png" alt="main logo" />
                    <h3 className="m-1 text-2xl font-bold text-red-600">BLGStat</h3>
                </div>
            </header>

            <div className="font-sans flex items-center w-1/2 flex-col m-10 p-9 shadow-xl rounded-3xl bg-gray-100">
                <img className="w-10" src="/assets/icons/icons8-statistics-50.png" alt="main logo" />
                <h3 className="m-1 text-2xl font-bold text-red-600">BLGStat</h3>

                <form
                    className="w-full flex flex-col items-center justify-center"
                    onSubmit={Submit}
                >
                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">Login successful! Redirecting...</p>}
                    <input
                        className="block w-1/2 m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
                        type="email"
                        name="email"
                        value={formLogin.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />

                    <input
                        className="block w-1/2 m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
                        type="password"
                        name="password"
                        value={formLogin.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />

                    <button
                        className="w-1/2 bg-red-600 text-white p-2 rounded-3xl text-xl border-2 hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-500"
                        type="submit"
                    >
                        Submit
                    </button>

                    <p>Don't have an account?</p>
                    <Link to="/signup" className="text-red-600">Signup</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
