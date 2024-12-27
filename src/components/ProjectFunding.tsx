import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Sample projects data (you can replace this with real project data)
const projects = [
  {
    id: 1,
    title: "Hospital Management System",
    description: "A project to improve hospital management.",
    category: "Hospital Management System",
    fundingGoal: 10000,
    currentFunding: 10,
    imageUrl:
      "https://media.istockphoto.com/id/1903423742/photo/medical-team-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=eI6bQ--x2NBPLM4SAuWDpZ1-HcOoUWj-ND04wX7erdA=",
  },
  {
    id: 2,
    title: "AI-Chatbot ML Project",
    category: "Machine Learning",
    fundingGoal: 15000,
    currentFunding: 6000,
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D12AQGeQPqQLh_PUQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698198023609?e=2147483647&v=beta&t=5uG2Lz8B5jdnLh0kZOPyYSOYWdyHrxlWsOK-bgscDpM",
  },
  {
    id: 3,
    title: "Sustainable Urban Garden Kit",
    category: "Data Science",
    fundingGoal: 20000,
    currentFunding: 8000,
    imageUrl:
      "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp",
  },
];

// Load the Razorpay script dynamically if not already loaded
const loadRazorpayScript = async () => {
  if (!window.Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  }
  return true;
};

const ProjectFundingPage = () => {
  const { projectId } = useParams(); // Extract projectId from the URL
  const project = projects.find((p) => p.id === Number(projectId)); // Find the project based on the URL param

  if (!project) {
    return <div className="text-center mt-10 text-xl">Project not found</div>;
  }

  // State to track current funding dynamically
  const [currentFunding, setCurrentFunding] = useState<number>(project.currentFunding || 0);

  // Handle Razorpay payment
  const handlePayment = async () => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Failed to load Razorpay. Please try again later.");
      return;
    }

    const options = {
      key: "rzp_live_I0SwaLrZPMkjwd", // Replace with your Razorpay key
      amount: 10 * 100, // Amount in paise (10 INR)
      currency: "INR",
      name: project.title,
      description: project.description,
      image: project.imageUrl,
      handler: () => {
        alert("Payment successful!");
        setCurrentFunding((prevFunding) => prevFunding + 10); // Add ₹10 to the current funding
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const fundingProgress = Math.min((currentFunding / project.fundingGoal) * 100, 100).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Project Title */}
      <h1 className="text-3xl font-bold text-center mb-6">{project.title}</h1>

      {/* Project Image */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      {/* Project Description */}
      <p className="text-lg mb-6 text-gray-700">{project.description}</p>

      {/* Funding Dashboard */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Funding Dashboard</h2>
        <p className="text-base mb-2">
          Raised:{" "}
          <span className="font-bold text-green-600">
            ₹{currentFunding.toLocaleString()}
          </span>{" "}
          / ₹{project.fundingGoal.toLocaleString()}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${fundingProgress}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{fundingProgress}% funded</p>
      </div>

      {/* Payment Button */}
      <div className="text-center">
        <button
          onClick={handlePayment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          Fund ₹10
        </button>
      </div>
    </div>
  );
};

export default ProjectFundingPage;
