import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        navigate('/login'); // Redirect to the login page after logging out
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
