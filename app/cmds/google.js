const { MessageType } = require("@adiwajshing/baileys")
const fs = require('fs');
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (zef, msg, args, from, reply) => {
    let google = args.slice(0).join('+');
    let link = `https://www.google.com/search?q=` + google
    reply(link)
}

exports.help = {
    name: "Google",
    description: "Show the bot's commands list",
    usage: "google",
    cooldown: 5,
};