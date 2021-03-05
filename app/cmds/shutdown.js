const { MessageType } = require("@adiwajshing/baileys");
const fs = require("fs");
const { id } = require("monk");
const {
  text,
  extendedText,
  contact,
  location,
  liveLocation,
  image,
  video,
  sticker,
  document,
  audio,
  product,
} = MessageType;

exports.run = (zef, msg, args, from, runnin) => {
  let owner = require('../helper/values')
  if (id != owner.nomorOwner) return runnin.reply("hanya owner !!")
    setTimeout(() => {
        runnin.reply("Bot akan di shutdown 3 detik lagi")
     }, 1500);
     setTimeout(() => {
       runnin.reply("Bot shutdown")
     }, 1000 * 5)
     setTimeout(() => {
       process.exit(1)
     }, 5000)
};

exports.help = {
  name: "Shutdown",
  description: "Show the bot's commands list",
  usage: "shutdown",
  cooldown: 5,
};
