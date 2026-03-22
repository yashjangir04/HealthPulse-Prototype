import React from "react";
import { useParams } from "react-router-dom";
import ZegoCloud from "../components/ZegoCloud";
import { FaNoteSticky } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { IoDocumentTextOutline, IoWarningOutline } from "react-icons/io5";
import { TbPill } from "react-icons/tb";

const MeetingRoom = () => {
  const { roomID } = useParams();
  const user = {
    name : "Yash Jangir",
    role : "doctor",
    // role : "patient",
  }

  return (
    <div>
      <div className={`w-full h-screen relative grid ${(user.role === "doctor") ? "grid-cols-[1.8fr_1fr]" : ""} gap-4 bg-white`}>
        <div className="meetingLeftBox grid grid-rows-2 gap-4 h-full">
          <div className="VideoChat w-full hoverflow-hidden rounded-3xl bg-secondary/50">
            <ZegoCloud />
          </div>
          <div className="NotesAndPrescriptionPanel bg-secondary/50 grid grid-cols-2 gap-4 p-4 rounded-3xl">
            <div className="notes flex flex-col gap-2 h-full">
              <div className="flex flex-col bg-white rounded-xl p-3 grow">
                <div className="flex items-center gap-2 text-gray-500 font-bold text-lg mb-2 poppins-semibold">
                  <FaNoteSticky className="text-ternary" />
                  Notes
                </div>
                <div className="bg-[#ebf2ff] rounded-lg p-2 flex flex-col gap-2 h-full">
                  <div className="bg-white rounded p-2.5 text-sm text-gray-500">
                    Frequent thirst , Fatigue
                  </div>
                  <div className="bg-white rounded p-2.5 text-sm text-gray-500">
                    Moderate glucose imbalance
                  </div>
                  <div className="bg-white rounded p-2.5 text-sm text-gray-500">
                    Avoid sugary drinks , Regular Yoga
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl flex items-center p-2 px-3 shadow-sm">
                <GrAttachment className="text-sm text-ternary mr-3 mt-1" />
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="grow outline-none text-sm text-gray-400 placeholder-gray-300"
                />
                <IoMdSend className="text-2xl text-ternary cursor-pointer hover:text-quarter duration-300" />
              </div>
            </div>

            <div className="prescription flex flex-col bg-white border-[3px] border-[#ebf2ff] rounded-xl p-3 h-full">
              <div className="flex items-center gap-2 text-gray-500 font-bold text-lg mb-2 poppins-semibold">
                <GiMedicinePills className="text-ternary text-2xl" />
                Prescription
              </div>
              <div className="bg-[#ebf2ff] rounded-lg p-2 flex flex-col gap-2 mb-3">
                <div className="bg-white rounded p-2.5 text-sm text-gray-700 poppins-regular">
                  Follow up: <span className="text-[#2a7df8]">Blood Test</span>
                </div>
                <div className="bg-white rounded p-2.5 text-sm text-gray-700 flex flex-col">
                  <span className="mb-2 text-gray-800 poppins-regular">
                    AI Summary:
                  </span>
                  <hr className="border-gray-300 mb-2" />
                  <div className="flex gap-1.5 items-start mt-1">
                    <span className="text-gray-500 text-[10px] mt-1">❯</span>
                    <span className="text-gray-600 poppins-regular">
                      <span className="font-bold text-gray-800 poppins-semibold">
                        Permil H
                      </span>{" "}
                      : One Dose Everyday for 1 month
                    </span>
                  </div>
                </div>
              </div>
              <button className="mt-auto w-full bg-ternary cursor-pointer hover:bg-quarter transition-colors text-white py-2.5 rounded-lg flex justify-center items-center gap-2 poppins-regular">
                Send to Patient
                <IoMdSend className="text-white" />
              </button>
            </div>
          </div>
        </div>
        {(user.role === "doctor") ? <div className="meetingRightBox bg-secondary/50 p-5 rounded-3xl flex flex-col gap-4 overflow-y-auto">
          {/* Patient Info */}
          <div className="flex flex-col gap-2 bg-white rounded-3xl px-4 py-4">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg poppins-semibold ml-1">
              Patient Info
            </div>
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-4 shadow-sm shadow-secondary">
              <div className="flex items-center gap-4">
                <img
                  src="/sundar-kanya.png"
                  alt="Viruska Sharma"
                  className="w-16 h-16 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <h3 className="poppins-semibold text-lg text-black">
                    Viruska Sharma
                  </h3>
                  <p className="inter-regular text-gray-700 text-sm">
                    28, Male <span className="text-gray-300 mx-1">|</span>{" "}
                    <span className="font-bold text-black">A+</span>
                  </p>
                </div>
              </div>
              <div className="bg-[#f4f7ff] rounded-xl p-4 flex flex-col gap-2 inter-regular text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-black">Allergies:</span>{" "}
                  Pencillin
                </p>
                <p>
                  <span className="font-semibold text-black">
                    Chronic Conditions:
                  </span>{" "}
                  Type-2 Diabetes
                </p>
              </div>
            </div>
          </div>

          {/* Medical Summary */}
          <div className="commonClassMed flex gap-10 flex-col bg-white rounded-3xl p-4">

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg poppins-semibold ml-1">
              <IoDocumentTextOutline className="text-[#4285f4] text-xl" />
              Medical Summary
            </div>
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
              <div className="bg-[#f4f7ff] border border-gray-100 rounded-xl p-3 flex flex-col gap-2 inter-regular text-sm text-gray-700">
                <p>Key Symptoms : Frequent thirst , Fatigue</p>
                <p>Type 2 Diabetes</p>
              </div>
              <div className="bg-[#ff4d4f] rounded-xl p-3 flex items-start gap-3 text-white">
                <IoWarningOutline className="text-4xl shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="poppins-semibold text-sm">
                    Abnormal glucose levels detected
                  </span>
                  <span className="inter-regular text-xs mt-0.5">
                    Latest reports 215mg/dl (very high)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Medications */}
          <div className="flex flex-col gap-2 grow">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg poppins-semibold ml-1">
              <GiMedicinePills className="text-[#4285f4] text-xl" />
              Current Medications
            </div>
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-sm grow inter-regular text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <TbPill className="text-[#8ab4f8] text-lg shrink-0" /> Metformin
                500 mg - Twice a Day
              </div>
              <div className="flex items-center gap-2">
                <TbPill className="text-[#8ab4f8] text-lg shrink-0" />{" "}
                Glimepiride 1 mg - Once Daily
              </div>
              <div className="flex items-center gap-2">
                <TbPill className="text-[#8ab4f8] text-lg shrink-0" />{" "}
                Atorvastatin 10 mg - Once at night
              </div>
              <div className="flex items-center gap-2">
                <TbPill className="text-[#8ab4f8] text-lg shrink-0" /> Losartan
                50 mg Once Daily
              </div>
            </div>
          </div>

          {/* Emergency Alert Button */}
          <button className="w-full bg-[#ff4d4f] hover:bg-red-600 transition-colors text-white py-3.5 rounded-xl flex justify-center items-center gap-2 poppins-semibold shadow-md mt-1 cursor-pointer duration-300">
            <IoWarningOutline className="text-xl" />
            Send Emergency Alert
          </button>
          </div>
        </div> : ""}

        <div className=""></div>
      </div>
    </div>
  );
};

export default MeetingRoom;
