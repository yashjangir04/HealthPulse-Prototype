const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  avatarUrl: {
    type: String,
  },
  documents: [
    {type: String}
  ],
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  address: {
    fullAddress: { type: String, required: true },

    city: String,
    state: String,
    pincode: String,

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    }
  },
  medicineReminders: [{
    medicine: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  }],
  secondaryContacts: [{ // [] can exist but empty element can't , in short if element exist then it must have both attributes
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    relation: {
      type: String,
    }
  }],
  medicalHistory: [{ type: String }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  aiContext: {
    type: String,
    default: ""
  }
}, { timestamps: true });

patientSchema.index({ "address.location": "2dsphere" });

patientSchema.path("secondaryContacts").validate(function (value) {
  return value.length > 0;
}, "At least one secondary contact is required");

module.exports = mongoose.model("Patient", patientSchema);