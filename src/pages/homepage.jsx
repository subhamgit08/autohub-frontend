import React from "react"
import { useNavigate } from "react-router-dom"

const Homepage = () => {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 flex flex-col scroll-smooth">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md fixed w-full z-50">

        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-cyan-400 bg-size-[200%_200%] bg-clip-text text-transparent animate-gradient">
          AutoHub
        </h1>

        <div className="space-x-4">

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-gray-700 hover:text-black font-medium transition cursor-pointer">

            Login

          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer">

            Sign Up

          </button>

        </div>

      </nav>


      {/* HERO SECTION */}

      <section className="relative flex flex-col justify-center items-center text-center h-screen px-6 overflow-hidden">

        {/* GRADIENT BACKGROUND BLOBS */}

        <div className="absolute w-125 h-125 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full blur-[120px] opacity-60 -top-40 -left-40 animate-pulse"></div>

        <div className="absolute w-112.5 h-112.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-[120px] opacity-60 -bottom-30 -right-30 animate-pulse"></div>

        <div className="absolute w-87.5 h-87.5 bg-linear-to-r from-indigo-500 to-blue-400 rounded-full blur-[100px] opacity-50 top-[30%] left-[60%]"></div>


        {/* HERO CONTENT */}

        <div className="relative z-10">

          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fadeUp">

            Buy & Sell Cars Effortlessly

          </h2>

          <p className="text-lg text-gray-600 max-w-xl mb-8 animate-fadeUp delay-100">

            AutoHub is a modern car marketplace where dealers can list vehicles
            and customers can browse and explore cars seamlessly.

          </p>

          <div className="space-x-4 animate-fadeUp delay-200">

            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer">

              Get Started

            </button>

            <button
              onClick={() => document.getElementById("features").scrollIntoView()}
              className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition cursor-pointer">

              Learn More

            </button>

          </div>

        </div>

      </section>


      {/* FEATURES / SKILLS SECTION */}

      <section id="features" className="py-24 px-10 bg-white/80 backdrop-blur-md">

        <h2 className="text-4xl font-bold text-center mb-16">
          Technologies & Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Secure Authentication
            </h3>

            <p className="text-gray-600">
              JWT authentication with protected routes, password hashing
              and OTP verification.
            </p>

          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Car Marketplace
            </h3>

            <p className="text-gray-600">
              Dealers can add, edit and delete cars while customers
              explore available listings dynamically.
            </p>

          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Cloud Image Upload
            </h3>

            <p className="text-gray-600">
              Images are uploaded securely using Cloudinary and
              stored in the cloud for fast access.
            </p>

          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Full Stack Architecture
            </h3>

            <p className="text-gray-600">
              Built with React, Node.js, Express and MongoDB
              following REST API architecture.
            </p>

          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Dealer Dashboard
            </h3>

            <p className="text-gray-600">
              A dedicated dashboard where dealers manage their
              car listings with complete CRUD functionality.
            </p>

          </div>

          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">

            <h3 className="text-xl font-semibold mb-3">
              Modern UI
            </h3>

            <p className="text-gray-600">
              Responsive UI built using Tailwind CSS with smooth
              interactions and animations.
            </p>

          </div>

        </div>

      </section>


      {/* GITHUB SECTION */}

      <section className="py-24 px-10 bg-gray-100 text-center">

        <h2 className="text-4xl font-bold mb-6">
          View The Source Code
        </h2>

        <p className="text-gray-600 mb-8">
          Explore the full project implementation on GitHub.
        </p>

        <a
          href="https://github.com/subhamgit08/autohub"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">

          Visit GitHub Repository

        </a>

      </section>


      {/* FOOTER */}

      <footer className="bg-black text-white py-6 text-center">

        <p>
          © {new Date().getFullYear()} AutoHub. Built by Subham Das.
        </p>

      </footer>

    </div>

  )
}

export default Homepage