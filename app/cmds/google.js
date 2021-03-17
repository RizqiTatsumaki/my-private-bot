const { MessageType } = require("@adiwajshing/baileys")
const fs = require('fs');
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (zef, msg, args, from) => {
    if (args.length < 1) return zef.reply("masukan teks")
    let google = args.slice(0).join('+');
    let link = `https://www.google.com/search?q=` + google
    zef.reply(link)
}

exports.help = {
    name: "Google",
    description: "",
    usage: "google",
    cooldown: 5,
    kategori: "fun"
};