const Appointment = require("../models/appointment-model");
const crypto = require('crypto');

const getAppointments = async (req, res) => {
    const userID = req.user.id;
    const appointments = await Appointment.find({
        $or: [
            { patientID: userID },
            { doctorID: userID }
        ]
    }).populate("patientID doctorID").lean();

    return res.status(200).send(appointments);
}

const endAppointment = async (req, res) => {
    const { meetingID } = req.body;
    try {
        await Appointment.updateOne({ roomID: meetingID }, { $set: { status: "completed", endTime: new Date() } })
        return res.status(200).json({ msg: "Meeting status updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Failed to update meeting status" });
    }
}

const cancelAppointment = async (req, res) => {
    const { meetingID } = req.body;
    
    try {
        await Appointment.updateOne({ _id: meetingID }, { $set: { status: "cancelled" } })
        return res.status(200).json({ msg: "Meeting status updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Failed to update meeting status" });
    }
}

const scheduleAppointment = async (req, res) => {
    const { startTime, patientID, doctorID } = req.body;

    try {
        await Appointment.create({
            roomID: crypto.randomUUID(),
            startTime: startTime,
            patientID,
            doctorID,
            status: "upcoming"
        });
        return res.status(200).json({ msg: "Appointment scheduled successfully" });
    }
    catch (err) {
        return res.status(500).json({ msg: "Failed to schedule appointment" });
    }
}

const rescheduleAppointment = async (req, res) => {
    const { startTime, meetingID } = req.body;

    try {
        await Appointment.updateOne(
            {
                _id: meetingID
            },
            {
                $set: {
                    startTime: startTime
                }
            }
        );
        return res.status(200).json({ msg: "Appointment rescheduled successfully" });
    }
    catch (err) {
        return res.status(500).json({ msg: "Failed to reschedule appointment" });
    }
}

module.exports = {
    getAppointments,
    endAppointment,
    cancelAppointment,
    scheduleAppointment,
    rescheduleAppointment
}