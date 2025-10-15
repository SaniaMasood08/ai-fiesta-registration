"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // make sure this path is correct

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    if (accessGranted) {
      const fetchRegistrations = async () => {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRegistrations(data);
      };
      fetchRegistrations();
    }
  }, [accessGranted]);

  const handleAccess = () => {
    if (password === "admin@123") {
      setAccessGranted(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!accessGranted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl bg-gray-800 text-white outline-none mb-4"
        />
        <button
          onClick={handleAccess}
          className="bg-purple-500 px-6 py-2 rounded-xl hover:bg-purple-600 transition"
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
        AI FIESTA 2K25 - Admin Dashboard
      </h1>

      {registrations.length === 0 ? (
        <p className="text-center text-gray-400">No registrations yet...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {registrations.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800/70 p-5 rounded-2xl shadow-lg border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                {team.teamName}
              </h2>

              {/* Team Leader */}
              <div className="text-sm text-gray-200 mb-3">
                <p className="font-semibold text-purple-400">Leader:</p>
                <p>{team.teamLeader.name}</p>
                <p>{team.teamLeader.email}</p>
                <p>
                  {team.teamLeader.dept} - {team.teamLeader.year} Year
                </p>
              </div>

              {/* Team Members */}
              {team.teamMembers && team.teamMembers.length > 0 && (
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-purple-400 mb-1">Members:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {team.teamMembers.map((member, idx) => (
                      <li key={idx}>
                        {member.name} ({member.email}) - {member.dept}{" "}
                        {member.year && `(${member.year} Year)`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
