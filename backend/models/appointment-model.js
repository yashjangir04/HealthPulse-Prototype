const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    appointmentRoomID: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["upcoming", "completed"],
        default: "upcoming"
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    notes: {
        type: String,
        required: true
    },
    prescribedMedicine: [{
        type: String,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);