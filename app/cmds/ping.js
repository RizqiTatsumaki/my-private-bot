const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

const moment = require("moment-timezone")
const istimer = (ts) => require('moment-timezone').duration(moment() - moment(ts * 1000)).asSeconds()

exports.run = (zef, message, args, from, runnin) => {
    runnin.reply(`🏓 PONG! • speed: ${istimer(message.messageTimestamp)}ms`);
};

exports.help = {
    name: "Ping",
    description: "PING PONG",
    usage: "ping",
    cooldown: 5,
    kategori: "util",
};