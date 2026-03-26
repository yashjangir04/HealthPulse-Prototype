const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    roomID: {
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
        enum: ["upcoming", "ingoing" , "completed" , "cancelled"],
        default: "ingoing"
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
    },
    prescribedMedicine: [{
        type: String,
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);