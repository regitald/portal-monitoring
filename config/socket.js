const server = require('../bin/server')
const { Server } = require("socket.io");

const io = new Server(server)

module.exports = {
    io
}