"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const DEPARTMENTS = [
  "AI-DS", "CSBS", "CSE", "IT", "MECH", "ECE",
  "EEE", "CSCS", "AI-ML", "VLSI", "ACT", "CIVIL"
];

const initialMemberState = {
  name: "",
  email: "",
  dept: "",
  year: "",
};

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState(initialMemberState);
  const [members, setMembers] = useState(Array(3).fill(initialMemberState));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [registrationCount, setRegistrationCount] = useState(0);

  // 🧩 Fetch number of registrations
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, "registrations"));
        setRegistrationCount(snapshot.size);
      } catch (err) {
        console.error("Error fetching registration count:", err);
      }
    };
    fetchRegistrationCount();
  }, [success]); // refresh count after each new registration

  const handleLeaderChange = (e) => {
    setLeader({ ...leader, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, e) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [e.target.name]: e.target.value };
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const filteredMembers = members.filter(
      (m) => m.name || m.email || m.dept || m.year
    );

    const registrationData = {
      teamName,
      teamLeader: leader,
      teamMembers: filteredMembers,
      registrationDate: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "registrations"), registrationData);
      setSuccess(true);
      setTeamName("");
      setLeader(initialMemberState);
      setMembers(Array(3).fill(initialMemberState));

      // ✅ Automatically open WhatsApp group link
      window.open("https://chat.whatsapp.com/JIwisgSO6cDBOeAdiXysv6", "_blank");

    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const renderMemberForm = (member, index, isLeader = false) => (
    <div
      key={index}
      className="bg-gray-800/70 backdrop-blur-md p-4 rounded-2xl shadow-lg space-y-3 border border-gray-700"
    >
      <h3 className="font-semibold text-purple-300">
        {isLeader ? "Team Leader" : `Member ${index + 2}`}
      </h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={member.name}
        onChange={isLeader ? handleLeaderChange : (e) => handleMemberChange(index, e)}
        required={isLeader}
        className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email ID"
        value={member.email}
        onChange={isLeader ? handleLeaderChange : (e) => handleMemberChange(index, e)}
        required={isLeader}
        className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex gap-3">
        <select
          name="dept"
          value={member.dept}
          onChange={isLeader ? handleLeaderChange : (e) => handleMemberChange(index, e)}
          required={isLeader}
          className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
        >
          <option value="" disabled>Select Department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          name="year"
          value={member.year}
          onChange={isLeader ? handleLeaderChange : (e) => handleMemberChange(index, e)}
          required={isLeader}
          className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
        >
          <option value="" disabled>Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>
      {!isLeader && (
        <p className="text-xs text-gray-400">
          Optional: Teams must have 2 to 4 members total (Leader + up to 3 members).
        </p>
      )}
    </div>
  );

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-6">
      {/* ✅ Success Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            key="success"
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-center p-8 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-4xl font-bold text-green-400 mb-4">
              🎉 Registration Successful!
            </h1>
            <p className="text-lg mb-6 text-gray-200">
              Your team has been successfully registered for <b>AI FIESTA 2K25</b>.
            </p>
            <a
              href="https://chat.whatsapp.com/JIwisgSO6cDBOeAdiXysv6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 px-6 py-3 rounded-xl hover:bg-purple-600 transition font-semibold"
            >
              Join WhatsApp Group
            </a>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 text-sm underline text-gray-400 hover:text-gray-300"
            >
              Register Another Team
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        className="text-4xl font-bold text-purple-400 mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI FIESTA 2K25 Team Registration 🤖
      </motion.h1>

      {/* 🔢 Registration Count */}
      <p className="text-gray-300 mb-6 text-sm">
        Total Registrations so far:{" "}
        <span className="text-purple-400 font-semibold">{registrationCount}</span>
      </p>

      <div className={`flex flex-col lg:flex-row gap-8 w-full max-w-6xl transition-all duration-500 ${success ? "blur-sm pointer-events-none" : ""}`}>
        {/* Event Info */}
        <motion.div
          className="lg:w-1/3 bg-gray-800/60 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-purple-400 border-b border-purple-500 pb-2 mb-4">
            Event Details
          </h2>
          <p className="text-sm">
            <span className="font-bold text-purple-300">Venue:</span> Dastagir Auditorium
          </p>
          <p className="text-sm">
            <span className="font-bold text-purple-300">Date:</span> 27th October
          </p>
          <p className="text-sm">
            <span className="font-bold text-purple-300">Time:</span> 9:15 AM – 3:10 PM
          </p>
          <p className="text-sm text-gray-300 pt-2 border-t border-gray-700">
            Showcase your skills, collaborate with brilliant minds, and have fun at AI FIESTA 2K25!
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:w-2/3 bg-gray-800/60 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
            Team Information
          </h2>

          <input
            type="text"
            name="teamName"
            placeholder="Enter Team Name (Required)"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />

          {renderMemberForm(leader, 0, true)}
          {members.map((member, index) => renderMemberForm(member, index))}

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 w-full py-3 rounded-2xl text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {error && (
            <p className="mt-4 text-center text-red-400 font-semibold">
              ❌ {error}
            </p>
          )}
        </motion.form>
      </div>
    </main>
  );
}
