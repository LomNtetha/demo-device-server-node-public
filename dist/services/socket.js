"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forwardAnalysis_1 = require("../demos/forwardAnalysis");
const path = require("path");
const net = require('node:net');
const bytesHexStr = require('../utils/bytesHexStr');
const { response } = require('../package/response');
const { protocolAnalysis } = require('../package/protocolAnalysis');
const { findMeDemo } = require('../demos/findeMeDemo');
const { getTimeStamp } = require('../demos/getTimeStamp');
module.exports = function createSocket() {
    const server = net.createServer((socket) => {
        console.log("📡 New socket connection attempt...");
        server.maxConnections = 5000;
        server.getConnections(function (err, count) {
            if (err) {
                console.error("❌ Error getting connections count:", err);
            }
            else {
                console.log(`👥 Current number of connected clients: ${count}`);
            }
        });
        socket.on('data', (dt) => {
            console.log("📥 Raw data received from client.");
            let str = dt.toString('hex').toUpperCase();
            console.log(`📜 Hex string: ${str}`);
            if (!str) {
                console.warn("⚠️ Empty data received, skipping processing...");
                return;
            }
            // 👇 Add this line to call forwardAnalysis
            (0, forwardAnalysis_1.forwardAnalysis)(str); // Logs JSON data
            let timeStamp = getTimeStamp(str);
            console.log("🕒 Timestamp buffer from getTimeStamp:", timeStamp);
            if (!timeStamp) {
                console.warn("⚠️ No timestamp generated, skipping...");
                return;
            }
            let buf = Buffer.from(timeStamp || []);
            console.log("🔁 Writing timestamp buffer back to client:", buf);
            socket.write(buf, () => {
                console.log("✅ Timestamp buffer sent to client.");
            });
            setTimeout(() => {
                console.log("⏰ 3s later... preparing to send FindMe command.");
                let findeMeVal = findMeDemo(str);
                console.log("🧭 FindMe command:", findeMeVal);
                let buf = Buffer.from(findeMeVal || []);
                console.log("📦 FindMe buffer:", buf);
                socket.write(buf, 'binary', () => {
                    console.log("✅ FindMe buffer sent to client.");
                });
            }, 3000);
        });
        socket.on('end', () => {
            console.log("🔌 Client disconnected.");
        });
        socket.on('error', (err) => {
            console.error("❌ Socket error:", err);
        });
        socket.on('timeout', () => {
            console.warn("⏳ Socket timeout.");
        });
    });
    server.listen(5010, '0.0.0.0', () => {
        console.log('🚀 TCP server is running on Port 5010...');
    });
    server.on('connection', (str) => {
        console.log("📞 New connection established:", str);
    });
    server.on('close', () => {
        console.log('🛑 TCP Server has been closed.');
    });
    server.on('error', (err) => {
        console.error('❌ TCP Server error occurred:', err);
    });
    return server;
};
