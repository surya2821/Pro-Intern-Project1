import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "../types/project";

// Load the Razorpay script dynamically if not already loaded
const loadRazorpayScript = async () => {
  if (!(window as any).Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return new Promise<boolean>((resolve) => {
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  }
  return true;
};

const ProjectFundingPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFunding, setCurrentFunding] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data: Project = await response.json();
        setProject(data);
        setCurrentFunding(data.currentFunding);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const updateAmount = async () => {
    if (!projectId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/amount/${projectId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading project...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">{error}</div>
    );
  }

  if (!project) {
    return <div className="text-center mt-10 text-xl">Project not found</div>;
  }

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
      image: project.image,
      handler: () => {
        alert("Payment successful!");
        setCurrentFunding((prevFunding) => prevFunding + 10); // Add ₹10 to the current funding
        updateAmount();
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

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const fundingProgress = Math.min(
    (currentFunding / project.fundingGoal) * 100,
    100
  ).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Project Title */}
      <h1 className="text-3xl font-bold text-center mb-6">{project.title}</h1>

      {/* Project Image */}
      <img
        src={project.image}
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