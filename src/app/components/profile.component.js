import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch} from 'react-redux';

const ProfileForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [formValues, setFormValues] = useState({
        twitterUsername: '',
        instagramUsername: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const buttonId = e.target.id; // Get the button's id
        const token = localStorage.getItem('token');

        try {
            if (buttonId === 'linkTwitter') {
                const res = await axios.post(
                    'http://localhost:5000/api/v1//profiletwitter',
                    {twitterUsername: formValues.twitterUsername},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                try {
                    const submitInfo = await axios.get('http://localhost:5000/api/v1/twitter/info', {
                        res,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (submitInfo) {
                        localStorage.setItem('insta_us', submitInfo.data.username);
                        setSuccessMessage("Twitter account linked successfully!");
                    }

                } catch (err) {
                    console.log('error fetching insat account ', err);
                }
            } else if (buttonId === 'linkInstagram') {
                // Update the use information by adding username of the Instagram
                const res = await axios.post(
                    'http://localhost:5000/api/v1/profileinsta',
                    {instagramUsername: formValues.instagramUsername},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // fetch the username from instagram and save it on my database usein rapidAPI
                try {
                    const submitInfo = await axios.get('http://localhost:5000/api/v1/instagram/info', {
                        res,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (submitInfo) {
                        localStorage.setItem('twitter_us', submitInfo.data.username);
                        setSuccessMessage("Instagram account linked successfully!");
                    }
                } catch (err) {
                    console.log('error fetching insta account ', err);
                }
            }
        } catch (err) {
            console.error(`Error linking ${buttonId === 'linkTwitter' ? 'Twitter' : 'Instagram'}:`, err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:5000/api/v1/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const user = res.data.data.user

                setFormValues({
                    ...formValues,
                    ['twitterUsername']: user.twitterUsername,
                    ['instagramUsername']: user.instagramUsername
                })
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData().then();
    }, []);

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-full mx-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Link Your Accounts</h2>

            {successMessage && (
                <div className="mb-6 p-4 text-green-800 rounded-lg shadow">
                    {successMessage}
                </div>
            )}

            <form>
                {/* Twitter Field */}
                <div className="mb-6">
                    <label htmlFor="twitter" className="block text-gray-700 font-medium mb-2">Twitter Username</label>
                    <input
                        type="text"
                        id="twitter"
                        name="twitterUsername"
                        value={formValues.twitterUsername}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder-gray-500 transition duration-200 ease-in-out"
                        placeholder="Enter your Twitter username"
                    />
                </div>

                <div
                    className="flex justify-center mb-8 bg-blue-500 p-2 text-white rounded-3xl hover:bg-blue-600 hover:pointer transition hover:duration-200 w-36">
                    <button
                        id="linkTwitter"
                        type="button"
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Link Twitter
                    </button>
                </div>

                {/* Instagram Field */}
                <div className="mb-6">
                    <label htmlFor="instagram" className="block text-gray-700 font-medium mb-2">Instagram
                        Username</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagramUsername"
                        value={formValues.instagramUsername}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50 placeholder-gray-500 transition duration-200 ease-in-out"
                        placeholder="Enter your Instagram username"
                    />
                </div>

                <div
                    className="flex justify-center bg-purple-900 p-2 text-white rounded-3xl hover:bg-pink-600 hover:pointer transition hover:duration-200 w-36">
                    <button
                        id="linkInstagram"
                        type="button"
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Link Instagram
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
