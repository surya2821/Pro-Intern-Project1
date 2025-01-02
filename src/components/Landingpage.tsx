import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { User } from "lucide-react";

// Sample user data for login state
const user = { name: "John Doe", isLoggedIn: true };

const featuredProjects = [
  { id: 1, title: "Hospital Management System", category: "Hospital Management", fundingProgress: 75, imageUrl: "https://media.istockphoto.com/id/1903423742/photo/medical-team-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=eI6bQ--x2NBPLM4SAuWDpZ1-HcOoUWj-ND04wX7erdA=" },
  { id: 2, title: "AI-Chatbot ML Project", category: "Machine Learning", fundingProgress: 60, imageUrl: "https://img.freepik.com/free-vector/flat-woman-chatting-with-chatbot-communicating-ai-robot-assistant_88138-959.jpg?semt=ais_hybrid" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
  { id: 3, title: "Sustainable Urban Garden Kit", category: "Data Science", fundingProgress: 40, imageUrl: "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp" },
];

const moreInformationItems = [
  { id: 1, title: "Secure Payments", description: "All transactions are encrypted and secure.", icon: "🔒" },
  { id: 2, title: "Global Community", description: "Join a worldwide network of creators and backers.", icon: "🌎" },
  { id: 3, title: "Transparent Funding", description: "Track every project's funding progress in real-time.", icon: "📊" },
  { id: 4, title: "24/7 Support", description: "Our team is here to help at any time.", icon: "🕒" },
  { id: 5, title: "Easy to Use", description: "Launch and manage projects with a user-friendly interface.", icon: "👌" },
];

const CombinedApp: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(user.isLoggedIn);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-indigo-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CrowdFund</h1>
          <div className="flex items-center space-x-8">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/" className="hover:text-gray-300">Projects</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            {loggedIn ? (
              <>
                  <a href="/profile">
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt="Profile"
                    className="rounded-full w-10 h-10"
                  />
                </a>
                <button
                  onClick={() => setLoggedIn(false)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                >
                  Join Now
                </button>
              </>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Fund the Future, Today</h1>
          <p className="text-xl md:text-2xl mb-8">Discover innovative projects or bring your ideas to life</p>
          <form className="flex max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-md transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Projects Section (Horizontal Scroll) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="project-scroll-container">
            <div className="project-scroll-inner">
              {featuredProjects.map((project) => (
                <div key={project.id} className="project-card bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.category}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${project.fundingProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{project.fundingProgress}% funded</p>
                    <a
                      href={`/projects/${project.id}`}
                      className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="flex overflow-x-auto space-x-8 px-4">
            {moreInformationItems.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bring Your Idea to Life?</h2>
          <p className="text-xl mb-8">
            Join thousands of creators and innovators on our platform
          </p>
          <a
            href="/start-project"
            className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We're on a mission to empower creators and innovators worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/how-it-works"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="/discover"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discover Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/start-project"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Start a Project
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Social Icons */}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style >{`
        .project-scroll-container {
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .project-scroll-inner {
          display: flex;
          animation: scroll 15s linear infinite;
        }

        .project-card {
          flex: 0 0 300px; /* Fixed width for each project card */
          margin-right: 20px;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default CombinedApp;
