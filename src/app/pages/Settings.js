import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [readOnlyInput, setReadOnlyInput] = useState(false);

    const [form, setForm] = useState({
        username: '',
        firstname: '',
        lastname: '',
    });

    const [passForm, setPassForm] = useState({
        password: '',
        newPassword: ''
    })

    const [createdAt, setCreatedAt] = useState(''); // State for account creation time

    useEffect(() => {
        getInfo(); // Load user info when the component mounts
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleChangePass = (e) => {
        setPassForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setReadOnlyInput((prev) => !prev);
    };
    const hanleChangePass = () => {
        setIsChangingPassword((prev) => (!prev));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (readOnlyInput) {
            const token = localStorage.getItem('token');
            try {
                const updateInfo = await axios.post('http://localhost:5000/api/v1/update', form, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (updateInfo.status === 200) {
                    console.log('Information updated successfully');
                    getInfo();
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getInfo = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/v1/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            console.log('API Response:', response.data); // Debugging log
    
            if (response && response.data) {
                const user = response.data.data.user;
                
                setForm({
                    firstname: user.firstName || '',
                    lastname: user.lastName || '',
                    username: user.username || '',
                });
                setCreatedAt(user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A');
            }
        } catch (err) {
            console.error('Error fetching user info:', err);
        }
    };

    const changePassword = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = axios.post('http://localhost:5000/api/v1/changepassword', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: {
                    password : passForm.password,
                    newPassword: passForm.newPassword
                }
            });

            if((await response).status === 201){
               navigate('/logout');
            }

        }catch(err) {
            console.log(err);
        }
    }
    

    return (
        <div className="flex font-sans bg-gray-100 h-screen w-full">
            <aside className="z-10 bg-white shadow-md">
                <NavBar />
            </aside>

            <div className="flex-1 p-6 w-full flex-grow overflow-y-scroll h-screen">
                <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md w-full">
                    <h2 className="text-2xl font-semibold mb-6">Settings</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                value={form.username} 
                                onChange={handleChange} 
                                readOnly={!readOnlyInput}
                                className=" border-2 border-gray-300 block w-full m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input 
                                type="text" 
                                id="firstname" 
                                name="firstname" 
                                value={form.firstname} 
                                onChange={handleChange} 
                                readOnly={!readOnlyInput}
                                className="border-2 border-gray-300 block w-full m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input 
                                type="text" 
                                id="lastname" 
                                name="lastname" 
                                value={form.lastname} 
                                onChange={handleChange} 
                                readOnly={!readOnlyInput}
                                className="border-2 border-gray-300 block w-full m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
                            />
                        </div>
                        <div className="mb-4">
                            <button 
                                type="submit"
                                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:text-red-600 transition duration-500"
                                onClick={handleEditClick}
                            >
                                {readOnlyInput ? 'Save Changes' : 'Edit Info'}
                            </button>
                        </div>
                    </form>
                    <div className="mb-4">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:text-red-600 transition duration-500"
                            onClick={hanleChangePass}
                        >
                            Change Password
                        </button>

                        {isChangingPassword && (
                            <form>
                                <input
                                    aria-label="Password"
                                    className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
                                    type="password"
                                    name="password"
                                    value={passForm.password}
                                    onChange={handleChangePass}
                                    placeholder="Password"
                                    required
                                />

                                <input
                                    aria-label="New Password"
                                    className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
                                    type="password"
                                    name="passwordConfirm"
                                    value={passForm.newPassword}
                                    onChange={handleChangePass}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:text-red-600 transition duration-500"
                                    onClick={changePassword}
                                >
                                     Confirm
                                </button>
                            </form>
                        )}
                    </div>

                    {createdAt && (
                        <p className="text-sm text-gray-600">
                            Account created on: <span className="font-semibold">{createdAt}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
