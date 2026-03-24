const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    shopkeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shopkeeper"
    },
    medicines: [{
        type: String,
        required: true
    }],
    requestAcceptors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shopkeeper"
    }],
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);