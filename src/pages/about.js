import React from "react";

const About = () => {
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
        </div>
      </nav>

      <main className="flex-grow">
        {/* About Section */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About CrowdFund</h1>
            <p className="text-xl md:text-2xl mb-8">
              Empowering creators, innovators, and changemakers to bring their ideas to life and make an impact.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              At CrowdFund, we aim to bring together a global community of creators, innovators, and backers. We provide a
              platform to fund innovative projects, launch ideas into reality, and help change the world. Whether you're
              launching a new product or supporting a cause, we're here to make your journey easier and more impactful.
            </p>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1527359881114-1786ff777bbb?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjJ4NTg4fHx8c2VhcmNofDN8fGdyb3dufGVufDB8fHx8fDE2NzA4NjYyMzg&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Our Mission"
                className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-lg"
              />
            </div>
            <p className="text-lg text-gray-700">
              We are committed to ensuring transparency, trust, and security for both creators and backers, providing
              real-time funding progress, secure payments, and an easy-to-use platform for launching your projects.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="min-w-[250px] bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-600 text-center">
                  We believe in the power of teamwork and community. Together, we can create something amazing.
                </p>
              </div>
              <div className="min-w-[250px] bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600 text-center">
                  Our platform supports creativity and new ideas that challenge the norm and drive positive change.
                </p>
              </div>
              <div className="min-w-[250px] bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2">Impact</h3>
                <p className="text-gray-600 text-center">
                  Our goal is to make a tangible impact in the world, by helping ideas and causes come to life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white py-16">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us Today</h2>
            <p className="text-xl mb-8">
              Become a part of our global community and take your project to new heights. Together, let's fund the future!
            </p>
            <a
              href="/start-project"
              className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
