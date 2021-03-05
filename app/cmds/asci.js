const { MessageType } = require("@adiwajshing/baileys")
const fs = require('fs');
const figlet = require('figlet')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (zef, msg, args, from, runnin) => {
    if (!args[0]) return runnin.reply("masukan teks")
    figlet(args.join(" "), (err, data) => {
        runnin.reply(data)
     })
}

exports.help = {
    name: "Asci",
    description: "Show the bot's commands list",
    usage: "asci",
    cooldown: 5,
};