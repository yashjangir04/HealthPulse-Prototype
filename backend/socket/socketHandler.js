const { addDoctor, addPatient, removeDoctor, removePatient } = require("../services/matchingService");

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id} ✅`);

        socket.on("disconnect" , () => {
            console.log(`User Disconnected: ${socket.id} ❌`);
        })
    });

};

module.exports = socketHandler ;