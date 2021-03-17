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

exports.run = (zef, msg, args, from) => {
  if (
    zef.id !== zef.config.developer.ibnu &&
    zef.id !== zef.config.developer.zefian &&
    zef.id !== zef.config.developer.rizqi &&
    zef.id !== zef.config.developer.bot
  )
    return zef.reply("just owner");
  zef.reply("Bot akan di shutdown 3 detik lagi");
  setTimeout(() => {
    zef.sendText("Bot shutdown");
  }, 1000 * 5);
  setTimeout(() => {
    process.exit(1);
  }, 5000);
};

exports.help = {
  name: "Shutdown",
  description: "",
  usage: "shutdown",
  cooldown: 5,
  kategori: "owner",
};
