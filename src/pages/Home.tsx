import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const featuredProjects = [
  {
    id: 1,
    title: "Hospital Management System",
    category: "Environment",
    fundingProgress: 75,
    imageUrl:
      "https://media.istockphoto.com/id/1903423742/photo/medical-team-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=eI6bQ--x2NBPLM4SAuWDpZ1-HcOoUWj-ND04wX7erdA=",
  },
  {
    id: 2,
    title: "AI-Chatbot ML Project",
    category: "Machine Learning",
    fundingProgress: 60,
    imageUrl:
      "https://res.cloudinary.com/dswrgvg3c/image/upload/v1735401767/ngxbeta9rhlnoqs8imeu.jpg",
  },
  {
    id: 3,
    title: "Sustainable Urban Garden Kit",
    category: "Data Science",
    fundingProgress: 40,
    imageUrl:
      "https://platform3solutions.com/wp-content/uploads/2024/02/Archived-data-for-analytics.webp",
  },
];

const moreInformationItems = [
  { id: 1, title: "Secure Payments", description: "All transactions are encrypted and secure.", icon: "🔒" },
  { id: 2, title: "Global Community", description: "Join a worldwide network of creators and backers.", icon: "🌎" },
  { id: 3, title: "Transparent Funding", description: "Track every project's funding progress in real-time.", icon: "📊" },
  { id: 4, title: "24/7 Support", description: "Our team is here to help at any time.", icon: "🕒" },
  { id: 5, title: "Easy to Use", description: "Launch and manage projects with a user-friendly interface.", icon: "👌" },
];

const App = () => {
  const { user, isLoading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered projects based on search query
  const filteredProjects = featuredProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 to-purple-700 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10397/10397171.png"
            alt="CrowdFund Logo"
            className="w-12 h-12"
          />
          <h1 className="text-4xl font-extrabold tracking-wide">CrowdFund</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="/"
            className="flex items-center space-x-3 hover:text-gray-300 transition duration-300 text-lg font-bold"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
              alt="Home"
              className="w-6 h-6"
            />
            <span>Home</span>
          </a>
          <a
            href="/projects"
            className="flex items-center space-x-3 hover:text-gray-300 transition duration-300 text-lg font-bold"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/149/149352.png"
              alt="Add Project"
              className="w-6 h-6"
            />
            <span>Add Project</span>
          </a>
          <a
            href="/about"
            className="flex items-center space-x-3 hover:text-gray-300 transition duration-300 text-lg font-bold"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1006/1006555.png"
              alt="About"
              className="w-6 h-6"
            />
            <span>About</span>
          </a>
          <a
            href="/fund"
            className="flex items-center space-x-3 hover:text-gray-300 transition duration-300 text-lg font-bold"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3523/3523063.png"
              alt="Funding"
              className="w-6 h-6"
            />
            <span>Funding</span>
          </a>
          <a
            href="/dashboard"
            className="flex items-center space-x-3 hover:text-gray-300 transition duration-300 text-lg font-bold"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2884/2884646.png"
              alt="Dashboard"
              className="w-6 h-6"
            />
            <span>Dashboard</span>
          </a>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <a href="/profile">
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  alt="Profile"
                  className="rounded-full w-12 h-12 border-4 border-white hover:scale-110 transition duration-300"
                />
              </a>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-sm font-bold text-white transition duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="bg-indigo-700 hover:bg-indigo-800 px-6 py-3 rounded text-sm font-bold transition duration-300"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-sm font-bold transition duration-300"
              >
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu (Toggle Button) */}
        <button
          className="md:hidden flex items-center text-white hover:text-gray-300 transition duration-300"
          aria-label="Open Menu"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
            alt="Menu"
            className="w-8 h-8"
          />
        </button>
      </div>
    </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Fund the Future, Today</h1>
            <p className="text-xl md:text-2xl mb-8">Discover innovative projects or bring your ideas to life</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-md transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105"
                  onClick={() => (window.location.href = `/projects/${project.id}`)}
                >
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
                    <p className="text-sm text-gray-600 mb-4">
                      {project.fundingProgress}% funded
                    </p>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="text-gray-500 text-center text-lg">
                  No projects match your search.
                </div>
              )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Bring Your Idea to Life?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of creators and innovators on our platform
            </p>
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
