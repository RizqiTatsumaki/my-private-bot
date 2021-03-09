const { MessageType } = require("@adiwajshing/baileys");
const fs = require("fs");

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
  if (
    runnin.id !== runnin.config.developer.ibnu &&
    runnin.id !== runnin.config.developer.zefian &&
    runnin.id !== runnin.config.developer.rizqi &&
    runnin.id !== runnin.config.developer.bot
  ) return runnin.reply("just owner");
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
  description: "",
  usage: "shutdown",
  cooldown: 5,
  kategori: "owner",
};
