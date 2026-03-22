import React, { useEffect, useState } from "react";
import { PiPillFill, PiPlusBold, PiTrashBold, PiXBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";

const MediList = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const [hour , setHour] = useState(new Date().getHours());
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000); // update every 1 min

    return () => clearInterval(interval);
  }, []);

  const [medications, setMedications] = useState([
    {
      name: "Metformin 500 mg",
      schedule: {
        M: "taken",
        A: "immediate",
        E: "not-prescribed",
        N: "not-prescribed",
      },
    },
    {
      name: "Glimepiride 1 mg",
      schedule: {
        M: "not-prescribed",
        A: "not-prescribed",
        E: "later",
        N: "not-prescribed",
      },
    },
    {
      name: "Atorvastatin 10 mg",
      schedule: {
        M: "not-prescribed",
        A: "not-prescribed",
        E: "not-prescribed",
        N: "later",
      },
    },
    {
      name: "Alosartan 50 mg",
      schedule: {
        M: "missed",
        A: "not-prescribed",
        E: "not-prescribed",
        N: "not-prescribed",
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    schedule: {
      M: "not-prescribed",
      A: "not-prescribed",
      E: "not-prescribed",
      N: "not-prescribed",
    },
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "taken":
        return "bg-green-100 text-green-600 border-green-200";
      case "missed":
        return "bg-red-100 text-red-600 border-red-200";
      case "immediate":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "later":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-400 border-gray-200";
    }
  };

  const handleSlotClick = (medIndex, slot) => {
    if (medications[medIndex].schedule[slot] === "immediate") {
      const updatedMeds = [...medications];
      updatedMeds[medIndex].schedule[slot] = "taken";
      setMedications(updatedMeds);
    }
  };

  const handleDelete = (indexToDelete) => {
    setMedications(medications.filter((_, index) => index !== indexToDelete));
  };

  const handleToggleSlot = (slot) => {
    setNewMed((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [slot]:
          prev.schedule[slot] === "not-prescribed" ? "later" : "not-prescribed",
      },
    }));
  };

  const handleAddSubmit = () => {
    if (!newMed.name.trim()) return;
    setMedications([...medications, newMed]);
    setIsModalOpen(false);
    // Reset form
    setNewMed({
      name: "",
      schedule: {
        M: "not-prescribed",
        A: "not-prescribed",
        E: "not-prescribed",
        N: "not-prescribed",
      },
    });
  };

  return (
    <div className="poppins-regular w-full min-h-screen flex flex-col gap-6 p-4 md:p-6 items-center relative bg-white">
      <div className="mediList-top flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0">
        <div className="mediList-top-left-section flex flex-row gap-4 md:gap-5 items-center">
          <div className="bg-blue-100 p-3 fancy-border-radius-1">
            <PiPillFill className="text-[32px] text-blue-500" />
          </div>
          <div className="mediL-top-text flex flex-col text-center md:text-left">
            <h1 className="poppins-semibold text-xl md:text-2xl text-gray-800">
              Medication Reminder
            </h1>
            <h3 className="text-gray-400 text-xs md:text-sm">
              Keep track of your daily medications.
            </h3>
          </div>
        </div>
        <div className="mediList-top-right-section flex flex-row items-center gap-3">
          <img
            src="sundar-kanya.png"
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <h1 className="text-lg font-semibold text-gray-700 w-20 leading-tight">
            Virushka Sharma
          </h1>
        </div>
      </div>

      <div className="w-full bg-blue-50/50 rounded-3xl p-4 md:p-6 border border-blue-100/80">
        <div className="flex flex-col xl:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium w-full xl:w-auto text-center">
            Your today's Medication schedule
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium text-center flex-1">
              Date : {date}-{months[month]}-{year}
            </div>
            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium text-center  text-nowrap flex-1">
              Current time slot:{" "}
              {hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening"}
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-162.5">
            <div className="grid grid-cols-5 gap-4 mb-4 px-4 text-gray-500 font-medium text-sm md:text-base">
              <div className="col-span-1">Medicine</div>
              <div className="text-center">Morning(M)</div>
              <div className="text-center">Afternoon(A)</div>
              <div className="text-center">Evening(E)</div>
              <div className="text-center">Night(N)</div>
            </div>

            <div className="flex flex-col gap-3">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 items-center bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm relative group"
                >
                  <div className="flex items-center justify-between col-span-1 pr-2">
                    <div className="flex items-center gap-2 font-semibold text-gray-700 text-sm md:text-base">
                      <IoIosArrowForward className="text-gray-400 shrink-0" />
                      <span className="truncate" title={med.name}>
                        {med.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                      title="Delete Medication"
                    >
                      <PiTrashBold size={16} />
                    </button>
                  </div>

                  {/* Schedule Slots */}
                  {["M", "A", "E", "N"].map((slot) => (
                    <div key={slot} className="flex justify-center">
                      <div
                        onClick={() => handleSlotClick(index, slot)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border font-bold text-sm md:text-base ${med.schedule[slot] === "immediate" ? "cursor-pointer" : ""} ${getStatusClass(med.schedule[slot])}`}
                      >
                        {slot}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {medications.length === 0 && (
                <div className="text-center py-6 text-gray-400 text-sm">
                  No medications scheduled. Add one below!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 text-sm md:text-base cursor-pointer"
          >
            <PiPlusBold /> Add Medication
          </button>
        </div>
      </div>

      <div className="w-full px-2 mt-2 mb-8">
        <div className="flex flex-wrap justify-center md:justify-between gap-3 md:gap-6 text-xs md:text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-green-100 flex items-center justify-center text-[10px] text-green-600 border border-green-200">
              M
            </span>{" "}
            Taken
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-red-100 flex items-center justify-center text-[10px] text-red-600 border border-red-200">
              M
            </span>{" "}
            Missed
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-orange-100 flex items-center justify-center text-[10px] text-orange-600 border border-orange-200">
              M
            </span>{" "}
            Take Immediately
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-[10px] text-blue-600 border border-blue-200">
              M
            </span>{" "}
            Take later
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">
              M
            </span>{" "}
            Don't take
          </div>
        </div>
      </div>

      {/* --- Add Medication Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-6 animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl poppins-semibold text-gray-800 flex items-center gap-2">
                <PiPillFill className="text-blue-500" /> Add New Medicine
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
              >
                <PiXBold />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Medicine Name
              </label>
              <input
                type="text"
                placeholder="e.g. Paracetamol 500mg"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-700"
                autoFocus
              />
            </div>

            {/* Schedule Selectors */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-600">
                Select Schedule (Click to toggle)
              </label>
              <div className="flex justify-between gap-2">
                {["M", "A", "E", "N"].map((slot) => {
                  const isSelected = newMed.schedule[slot] !== "not-prescribed";
                  return (
                    <button
                      key={slot}
                      onClick={() => handleToggleSlot(slot)}
                      className={`flex-1 aspect-square rounded-2xl flex items-center justify-center text-lg font-bold border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-blue-100 text-blue-600 border-blue-300 shadow-sm scale-105"
                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-center text-gray-400 mt-1">
                Selected slots will be scheduled as "Take later".
              </p>
            </div>

            <button
              onClick={handleAddSubmit}
              disabled={!newMed.name.trim()}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl mt-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer"
            >
              Save Medication
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediList;
