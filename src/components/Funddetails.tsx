import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  
  const sendFund = async (fullName: string, email: string, phone: string, address: string, city: string, country: string, fundamount: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/fundy/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, address, city, country, fundamount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error in form submission');
      else {
        navigate('/home');
      }

    } catch (error) {
      console.log(error);
      // You can display a user-friendly error message here
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    fundamount: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      agreeToTerms: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      // Convert fundamount to a number for the API call
      const fundamount = parseFloat(formData.fundamount);

      // Validate fundamount is a valid number
      if (isNaN(fundamount) || fundamount <= 0) {
        alert("Please enter a valid amount in rupees.");
        return;
      }

      await sendFund(formData.fullName, formData.email, formData.phone, formData.address, formData.city, formData.country, fundamount);

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Enter Your Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-semibold text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-lg font-semibold text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-lg font-semibold text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your country"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fundamount" className="block text-lg font-semibold text-gray-700">Fund Amount (in Rupees)</label>
            <input
              type="number"
              id="fundamount"
              name="fundamount"
              value={formData.fundamount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter fund amount"
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-indigo-600"
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
              I agree to the <a href="/terms" className="text-indigo-600">terms and conditions</a>.
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
              disabled={!formData.agreeToTerms}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
