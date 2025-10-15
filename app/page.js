"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white text-center p-6">
      <motion.h1
        className="text-5xl font-bold mb-4 text-purple-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌟 AI FIESTA 2K25 🌟
      </motion.h1>

      <p className="text-lg max-w-xl mb-8">
        Organized by the Department of Artificial Intelligence & Data Science  
        Experience a fusion of fun, creativity, and technology!
      </p>

      {/* 🟣 Added Event Details Section */}
      <div className="mt-4 text-left max-w-2xl bg-gray-900/60 p-6 rounded-2xl border border-purple-600 mb-8">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Event Details</h2>
        <p className="text-gray-300 mb-2"><b>Date:</b> 27/10/25</p>
        <p className="text-gray-300 mb-2"><b>Time:</b> 9:15 AM – 3:10 PM</p>
        <p className="text-gray-300 mb-2"><b>Venue:</b> Dasthagir Auditorium, MSAJCE</p>
        <p className="text-gray-300 mb-4">
          An inter-departmental technical fest showcasing innovation, creativity,
          and AI-driven problem-solving challenges.
        </p>
        
      </div>

      {/* 🟣 Organizing Committee Section */}
      <div className="bg-gray-800 bg-opacity-40 p-6 rounded-2xl shadow-lg mb-8 max-w-lg">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">
          Organizing Committee
        </h3>
        <p className="text-sm"><b>Convener:</b> Dr. S. Regilan (HOD / AIDS)</p>
        <p className="text-sm"><b>Co-Convener:</b> Prof. Vimalathithan (IIC President)</p>
        <p className="text-sm"><b>Staff Co-ordinator:</b> D. Sudha (AP / AIDS)</p>
        <p className="text-sm mt-2"><b>Student Co-ordinators:</b></p>
        <ul className="text-sm list-disc list-inside text-gray-300">
          <li>Asim Fayaz – 2nd Yr / AIDS</li>
          <li>Sania Masood – 2nd Yr / AIDS</li>
          <li>Mohamed Hashib H – 2nd Yr / AIDS</li>
          <li>Mohamed Faisal – 2nd Yr / AIDS</li>
          
        </ul>
      </div>

      <div className="flex gap-4">
        <Link
          href="/register"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg transition"
        >
          Register Now
        </Link>

        <Link
          href="/admin"
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-lg transition"
        >
          Admin Login
        </Link>
      </div>
    </main>
  );
}
