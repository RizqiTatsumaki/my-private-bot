const { MessageType } = require("@adiwajshing/baileys")
const fs = require('fs');
const figlet = require('figlet')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (zef, msg, args, from) => {
    if (args.length < 1) return zef.reply("masukan teks")
    figlet(args.join(" "), (err, data) => {
        zef.reply(data)
     })
}

exports.help = {
    name: "Asci",
    description: "",
    usage: "asci",
    cooldown: 5,
    kategori: "fun"
};