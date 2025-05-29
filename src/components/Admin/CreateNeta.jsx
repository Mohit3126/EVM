import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  indianStates,
  electionTypes,
  politicalParties,
} from "../../testData/states";
import "react-toastify/dist/ReactToastify.css";

const CreateNeta = () => {
  const [form, setForm] = useState({
    neta: "",
    party: "",
    state: "",
    electionType: "",
    aadhar: "",
    age: "",
    gender: "",
  });
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  // Dropdown state
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showElectionDropdown, setShowElectionDropdown] = useState(false);
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);
  const [stateQuery, setStateQuery] = useState("");
  const [electionQuery, setElectionQuery] = useState("");
  const [partyQuery, setPartyQuery] = useState("");

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStateInput = (e) => {
    setStateQuery(e.target.value);
    setForm({ ...form, state: e.target.value });
    setShowStateDropdown(true);
  };

  const handleElectionInput = (e) => {
    setElectionQuery(e.target.value);
    setForm({ ...form, electionType: e.target.value });
    setShowElectionDropdown(true);
  };

  const handlePartyInput = (e) => {
    setPartyQuery(e.target.value);
    setForm({ ...form, party: e.target.value });
    setShowPartyDropdown(true);
  };

  const handleStateSelect = (state) => {
    setForm({ ...form, state });
    setStateQuery(state);
    setShowStateDropdown(false);
  };

  const handleElectionSelect = (type) => {
    setForm({ ...form, electionType: type });
    setElectionQuery(type);
    setShowElectionDropdown(false);
  };

  const handlePartySelect = (party) => {
    setForm({ ...form, party });
    setPartyQuery(party);
    setShowPartyDropdown(false);
  };

  // Filtered lists
  const filteredStates = indianStates.filter((s) =>
    s.toLowerCase().includes(stateQuery.toLowerCase())
  );
  const filteredElectionTypes = electionTypes.filter((t) =>
    t.toLowerCase().includes(electionQuery.toLowerCase())
  );
  const filteredParties = politicalParties.filter((p) =>
    p.toLowerCase().includes(partyQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.aadhar || !/^\d{12}$/.test(form.aadhar)) {
      setMessage("Please enter a valid 12-digit Aadhar number.");
      toast.error("Please enter a valid 12-digit Aadhar number.");
      return;
    }
    if (
      !form.age ||
      isNaN(form.age) ||
      Number(form.age) < 18 ||
      Number(form.age) > 100
    ) {
      setMessage("Please enter a valid age (18 or older and 100 or younger).");
      toast.error("Please enter a valid age (18 or older and 100 or younger).");
      return;
    }
    if (!form.gender) {
      setMessage("Please select a gender.");
      toast.error("Please select a gender.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/createLeader",
        { ...form, age: Number(form.age) },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200 && res.data?.success) {
        setMessage("Neta created successfully!");
        toast.success("Neta created successfully!");
        setForm({
          aadhar: "",
          age: "",
          gender: "",
          party: "",
          state: "",
          electionType: "",
        });
        setStateQuery("");
        setElectionQuery("");
        setPartyQuery("");
      } else if (res.data?.message) {
        setMessage(res.data.message);
        toast.error(res.data.message);
      } else {
        setMessage("Failed to create Neta.");
        toast.error("Failed to create Neta.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Error: ${err.response.data.message}`);
        toast.error(`Error: ${err.response.data.message}`);
      } else if (err.message) {
        setMessage(`Error: ${err.message}`);
        toast.error(`Error: ${err.message}`);
      } else {
        setMessage("An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="colored"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 overflow-hidden"
      >
        <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-0 md:p-4 backdrop-blur-md border border-slate-200 flex flex-col md:flex-row md:items-stretch h-[90vh] md:h-[70vh]">
          {/* Left Side: Illustration or Info */}
          <div className="hidden md:flex flex-col justify-center items-center w-2/5 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-l-2xl p-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=NetaForm"
              alt="Neta Illustration"
              className="w-28 h-28 mb-4"
            />
            <h2 className="text-xl font-bold text-indigo-700 mb-1 text-center">
              Create Neta
            </h2>
            <p className="text-indigo-600 text-center text-sm">
              Fill the form to add a new leader to the system. All fields marked
              with <span className="text-red-500">*</span> are required.
            </p>
          </div>
          {/* Right Side: Form */}
          <div className="w-full md:w-3/5 p-4 flex flex-col justify-center overflow-y-auto">
            <motion.h2
              className="text-center text-indigo-800 mb-4 font-bold text-xl tracking-wide drop-shadow-lg md:hidden"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Create Neta
            </motion.h2>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1"
              >
                <label className="font-medium text-slate-700">
                  Neta Name<span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  name="neta"
                  value={form.neta}
                  onChange={handleChange}
                  required
                  whileFocus={{
                    borderColor: "#6366f1",
                    boxShadow: "0 0 0 2px #6366f1",
                  }}
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80"
                />
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1 relative"
              >
                <label className="font-medium text-slate-700">
                  Party<span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  name="party"
                  value={partyQuery}
                  onChange={handlePartyInput}
                  required
                  autoComplete="off"
                  onFocus={() => setShowPartyDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowPartyDropdown(false), 150)
                  }
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80 cursor-pointer"
                  placeholder="Select Party"
                />
                {showPartyDropdown && (
                  <ul className="absolute z-10 bg-white border border-indigo-200 rounded-md mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
                    {filteredParties.length > 0 ? (
                      filteredParties.map((party) => (
                        <li
                          key={party}
                          onMouseDown={() => handlePartySelect(party)}
                          className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                        >
                          {party}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-400">No party found</li>
                    )}
                  </ul>
                )}
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1 relative"
              >
                <label className="font-medium text-slate-700">State</label>
                <motion.input
                  type="text"
                  name="state"
                  value={stateQuery}
                  onChange={handleStateInput}
                  autoComplete="off"
                  onFocus={() => setShowStateDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowStateDropdown(false), 150)
                  }
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80 cursor-pointer"
                  placeholder="Select State"
                />
                {showStateDropdown && (
                  <ul className="absolute z-10 bg-white border border-indigo-200 rounded-md mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
                    {filteredStates.length > 0 ? (
                      filteredStates.map((state) => (
                        <li
                          key={state}
                          onMouseDown={() => handleStateSelect(state)}
                          className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                        >
                          {state}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-400">No state found</li>
                    )}
                  </ul>
                )}
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1 relative"
              >
                <label className="font-medium text-slate-700">
                  Election Type<span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  name="electionType"
                  value={electionQuery}
                  onChange={handleElectionInput}
                  required
                  autoComplete="off"
                  onFocus={() => setShowElectionDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowElectionDropdown(false), 150)
                  }
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80 cursor-pointer"
                  placeholder="Select Election Type"
                />
                {showElectionDropdown && (
                  <ul className="absolute z-10 bg-white border border-indigo-200 rounded-md mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
                    {filteredElectionTypes.length > 0 ? (
                      filteredElectionTypes.map((type) => (
                        <li
                          key={type}
                          onMouseDown={() => handleElectionSelect(type)}
                          className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                        >
                          {type}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-400">No type found</li>
                    )}
                  </ul>
                )}
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1"
              >
                <label className="font-medium text-slate-700">
                  Aadhar<span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  name="aadhar"
                  value={form.aadhar || ""}
                  onChange={handleChange}
                  required
                  maxLength={12}
                  minLength={12}
                  pattern="[0-9]{12}"
                  autoComplete="off"
                  placeholder="Enter 12-digit Aadhar number"
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80"
                />
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1"
              >
                <label className="font-medium text-slate-700">
                  Age<span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  required
                  min={18}
                  placeholder="Enter age (18+)"
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80"
                />
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.04 }}
                className="flex flex-col gap-1"
              >
                <label className="font-medium text-slate-700">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base transition-all bg-white/80"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.07, backgroundColor: "#3730a3" }}
                whileTap={{ scale: 0.96 }}
                className="mt-2 py-2 rounded-lg border-none bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg tracking-wide shadow-md transition-all duration-200 cursor-pointer"
              >
                Create
              </motion.button>
            </form>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mt-3 text-center font-medium ${
                  message.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateNeta;
