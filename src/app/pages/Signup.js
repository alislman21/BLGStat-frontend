import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if(formData.firstName < 3 || formData.lastName < 3){
      setError("First name and Last name must be grater than three characters")
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }



    try {
      const res = await axios.post('http://localhost:5000/api/v1/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });

      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError('Signup failed. Please try again.');
    }
  }

  return (
    <div className=" font-sans flex items-center justify-center flex-col w-full h-full ">

      <header className="w-full flex justify-between items-center bg-gray-100">
        <div className="w-1/4 flex items-center m-3">
          <img className="w-9" src="/assets/icons/icons8-statistics-50.png" alt="main logo" />
          <h3 className="m-1 text-2xl font-bold text-red-600">BLGStat</h3>
        </div>
      </header>


      <div className="p-4 font-sans flex items-center w-1/2 flex-col m-10 shadow-xl rounded-3xl bg-gray-100">
        <img className="w-10" src="/assets/icons/icons8-statistics-50.png" alt="main logo" />
        <h3 className="m-1 text-2xl font-bold text-red-600">BLGStat</h3>

        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={Submit}
        >
          {error && <p className="text-red-600">{error}</p>}
          {success && <Navigate to='/home' className="text-green-600">Signup successful! Redirecting...</Navigate>}

          <input
            aria-label="First Name"
            className="block w-1/2 m-1 p-2 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            aria-label="Last Name"
            className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />

          <input
            aria-label="Username"
            className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          <input
            aria-label="Email"
            className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            aria-label="Password"
            className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <input
            aria-label="Confirm Password"
            className="block w-1/2 m-1 p-2 rounded-2xl  bg-white focus:outline-none focus:ring-1 focus:ring-red-600 transition duration-300"
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          <button
            className="w-1/2 bg-red-600 text-white p-2 rounded-3xl text-xl border-2
             hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-500"
            type="submit"
          >
            Submit
          </button>

          <p>Do you have an account?</p>
          <Link to='/login' className='text-red-600'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
