import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getAppointments,
  scheduleAppointment,
  cancelAppointment,
  rescheduleAppointment,
} from "../api/appointment";
import { extractTime } from "../utils/DateTimeManager";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDoctor = user?.role === "doctor";

  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Start with an empty array. No more fake data!
  const [appointments, setAppointments] = useState([]);
  const fetchAppointments = async () => {
    try {
      const result = await getAppointments();
      setAppointments(result.data || []);
    } catch (error) {
      console.error("Failed fetching appointments:", error);
    }
  };

  useEffect(() => {
    // Fetch immediately when the page loads
    fetchAppointments();

    // convert the upcoming to connect if 
    const intervalId = setInterval(() => {
      fetchAppointments();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const tabs = [
    { id: "all", label: "All Appointments" },
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const statusPriority = {
    ongoing: 1,
    upcoming: 2,
    completed: 3,
    cancelled: 4,
  };

  const filteredAppointments = appointments
    .filter((app) => activeTab === "all" || app.status === activeTab)
    .sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      const timeA = new Date(a.startTime).getTime();
      const timeB = new Date(b.startTime).getTime();

      if (a.status === "completed" || a.status === "cancelled") {
        return timeB - timeA;
      }
      return timeA - timeB;
    });

  const getStatusStyles = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "ongoing":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // --- Handlers ---
  const handleJoinRoom = (roomID) => {
    navigate(`/meeting/${roomID}`);
  };

  const handleOpenReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate("");
    setNewTime("");
    setModalMode("reschedule");
    setIsModalOpen(true);
  };

  const handleOpenFollowUp = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate("");
    setNewTime("");
    setModalMode("followup");
    setIsModalOpen(true);
  };

  const handleOpenCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setModalMode("cancel");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    let combinedDateTimeISO = null;

    if (modalMode !== "cancel" && newDate && newTime) {
      // Result in the format -> "2026-03-30T14:30:00"
      const combinedString = `${newDate}T${newTime}:00`;

      // Convert to a Date object, then to a safe ISO string for MongoDB
      const dateTimeObject = new Date(combinedString);
      combinedDateTimeISO = dateTimeObject.toISOString();
    }

    if (modalMode === "reschedule") {
      console.log(
        "Rescheduling appointment:",
        selectedAppointment._id,
        "for",
        combinedDateTimeISO,
      );

      await rescheduleAppointment({
        meetingID: selectedAppointment._id,
        startTime: combinedDateTimeISO,
      });
    } else if (modalMode === "followup") {
      console.log(
        "Creating new followup for patient:",
        selectedAppointment.patientID._id,
        "at",
        combinedDateTimeISO,
      );

      await scheduleAppointment({
        startTime: combinedDateTimeISO,
        patientID: selectedAppointment.patientID._id,
        doctorID: selectedAppointment.doctorID._id,
      });
    } else if (modalMode === "cancel") {
      console.log("Cancelling appointment:", selectedAppointment._id);

      await cancelAppointment({
        meetingID: selectedAppointment._id,
      });
    }

    setIsModalOpen(false);
    fetchAppointments();
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="poppins-bold text-3xl text-gray-900">
          My <span className="text-blue-500">Appointments</span>
        </h1>
        <p className="inter-regular text-gray-500 mt-2">
          {isDoctor
            ? "Manage your patient schedule and meetings."
            : "Track and manage your healthcare visits."}
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full inter-medium text-sm transition-all duration-300 cursor-pointer border ${
              activeTab === tab.id
                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-blue-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <p className="inter-medium text-gray-500">
              No {activeTab !== "all" ? activeTab : ""} appointments found.
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment._id} // Using true MongoDB _id
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="bg-blue-50 rounded-xl p-4 text-center min-w-[100px] border border-blue-100">
                  <p className="poppins-semibold text-blue-600 text-lg">
                    {new Date(appointment.startTime).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short" },
                    )}
                  </p>
                  <p className="inter-medium text-gray-500 text-xs mt-1">
                    {extractTime(appointment.startTime)}
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-gray-900 text-lg">
                    {/* Maps to the populated database names perfectly! */}
                    {isDoctor
                      ? appointment?.patientID?.name || "Patient"
                      : appointment?.doctorID?.name || "Doctor"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inter-medium text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 capitalize">
                      {appointment.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto">
                <span
                  className={`inter-medium text-xs px-3 py-1.5 rounded-full uppercase tracking-wider border w-max ${getStatusStyles(appointment.status)}`}
                >
                  {appointment.status}
                </span>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:justify-end">
                  {appointment.status === "ongoing" && (
                    <button
                      onClick={() => handleJoinRoom(appointment.roomID)}
                      className="px-5 py-2.5 text-sm poppins-semibold rounded-full bg-green-500 cursor-pointer text-white hover:bg-green-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2 animate-pulse"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Join Meeting
                    </button>
                  )}

                  {isDoctor &&
                    (appointment.status === "upcoming" ||
                      appointment.status === "ongoing") && (
                      <button
                        onClick={() => handleOpenReschedule(appointment)}
                        className="px-4 py-2 text-sm inter-medium rounded-full border border-blue-200 text-blue-600 cursor-pointer hover:bg-blue-50 transition-colors flex items-center gap-1.5"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Reschedule
                      </button>
                    )}

                  {isDoctor && appointment.status === "completed" && (
                    <button
                      onClick={() => handleOpenFollowUp(appointment)}
                      className="px-4 py-2 text-sm inter-medium rounded-full border border-blue-200 text-blue-600 cursor-pointer hover:bg-blue-50 transition-colors flex items-center gap-1.5"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Schedule Follow-up
                    </button>
                  )}

                  {appointment.status === "upcoming" && (
                    <button
                      onClick={() => handleOpenCancel(appointment)}
                      className="px-4 py-2 text-sm inter-medium rounded-full border border-red-200 text-red-500 cursor-pointer hover:bg-red-50 transition-colors flex items-center gap-1.5"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="poppins-semibold text-xl text-gray-900">
                {modalMode === "reschedule" && "Reschedule Appointment"}
                {modalMode === "followup" && "Schedule Follow-up"}
                {modalMode === "cancel" && "Cancel Appointment"}
              </h2>
              <p className="inter-regular text-sm text-gray-500 mt-1">
                {modalMode === "reschedule" && "Updating time for "}
                {modalMode === "followup" && "Booking new visit for "}
                {modalMode === "cancel" &&
                  "Are you sure you want to cancel the visit with "}
                <span className="font-semibold text-gray-700">
                  {isDoctor
                    ? selectedAppointment?.patientID?.name
                    : selectedAppointment?.doctorID?.name}
                </span>
                ?
              </p>
            </div>

            <form onSubmit={handleModalSubmit} className="p-6 space-y-5">
              {modalMode !== "cancel" && (
                <>
                  <div>
                    <label className="inter-medium block text-sm text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors inter-regular"
                    />
                  </div>

                  <div>
                    <label className="inter-medium block text-sm text-gray-700 mb-2">
                      Select Time
                    </label>
                    <input
                      type="time"
                      required
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors inter-regular"
                    />
                  </div>
                </>
              )}

              {modalMode === "cancel" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl inter-medium text-sm border border-red-100">
                  This action cannot be undone. You will need to book a new
                  appointment if you change your mind.
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 px-4 rounded-full poppins-semibold text-gray-600 bg-white border-2 border-gray-200 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  {modalMode === "cancel" ? "Keep Appointment" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-full cursor-pointer poppins-semibold text-white shadow-md transition-all ${
                    modalMode === "cancel"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {modalMode === "reschedule" && "Confirm Changes"}
                  {modalMode === "followup" && "Book Follow-up"}
                  {modalMode === "cancel" && "Yes, Cancel It"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
