import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { io } from "socket.io-client";

const Lobby = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { user } = useAuth();
  let socket = null ;

  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      if (user.role === "doctor") {
        socket.emit("enter-doctor", {
          _id: user._id,
          speciality: user.specialization,
          socket: socket.id,
        });
      } else {
        socket.emit("enter-patient", {
          _id: user._id,
          requirement: speciality,
          socket: socket.id,
        });
      }
    });

    socket.on("matched" , (data) => {
        navigate(`/meeting/${data.roomID}`) ;
    })

    socket.on("disconnect", () => {
      if (user.role === "doctor") {
        socket.emit("leave-doctor", `Doctor disconnected : ${socket.id} ❌`);
      } else {
        socket.emit("leave-patient", `Patient disconnected : ${socket.id} ❌`);
      }
    });

    return () => {
      socket.emit("cancel");
      socket.disconnect();
    };
  }, []);

  const handleCancel = () => {
    if (user.role === "doctor") {
      socket.emit("leave-doctor", {
        _id: user._id,
        requirement: speciality,
        socket: socket.id,
      });
    } else {
      socket.emit("leave-patient", {
        _id: user._id,
        requirement: speciality,
        socket: socket.id,
      });
    }
    navigate(-1); // go to previous route/page (i.e. Connect)
  };

  const handleTryAgain = () => {
    setConnectionStatus("connecting");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to bottom right, #eef5ff, #e0efff)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-blue-50 text-center flex flex-col items-center">
        {/* State 1: Connecting */}
        {connectionStatus === "connecting" && (
          <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
            {/* CSS Vector Pulse Animation */}
            <div className="relative flex justify-center items-center w-40 h-40 mb-8 mt-4">
              {/* Outer pulsing circle */}
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              {/* Middle pulsing circle */}
              <div
                className="absolute inset-4 bg-blue-500 rounded-full animate-ping opacity-40"
                style={{ animationDelay: "0.5s" }}
              ></div>
              {/* Center static circle with icon */}
              <div className="relative z-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="poppins-bold text-2xl text-gray-900 mb-2">
              Finding your{" "}
              <span className="text-blue-500 capitalize">{speciality}</span>...
            </h2>
            <p className="inter-regular text-gray-500 text-sm mb-10">
              Please hold on while we connect you to an available doctor.
            </p>

            <button
              onClick={handleCancel}
              className="w-full py-4 px-4 cursor-pointer rounded-full inter-medium text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200 hover:border-red-200"
            >
              Cancel Search
            </button>
          </div>
        )}

        {/* State 2: Connection Failed / No Match */}
        {connectionStatus === "failed" && (
          <div className="flex flex-col items-center w-full animate-in zoom-in-95 fade-in duration-300">
            {/* Failed Icon */}
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="poppins-bold text-2xl text-gray-900 mb-2">
              No Doctors Available
            </h2>
            <p className="inter-regular text-gray-500 text-sm mb-8 px-4">
              All our <span className="capitalize">{speciality}s</span> are
              currently busy. Please try again or go back to select another
              option.
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={handleTryAgain}
                className="w-full py-4 px-4 rounded-full cursor-pointer poppins-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-md hover:shadow-blue-500/30"
              >
                Try Again
              </button>

              <button
                onClick={handleCancel}
                className="w-full py-4 px-4 rounded-full cursor-pointer poppins-semibold text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
