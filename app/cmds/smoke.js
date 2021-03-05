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
    setTimeout(() => {
        runnin.sendText('🚬');
      }, 500);
      setTimeout(() => {
        runnin.sendText('🚬 ☁ ');
      }, 1000);
      setTimeout(() => {
        runnin.sendText('🚬 ☁☁ ');
      }, 1500);
      setTimeout(() => {
        runnin.sendText('🚬 ☁☁☁ ');
      }, 2000);
      setTimeout(() => {
        runnin.sendText('🚬 ☁☁');
      }, 2500);
      setTimeout(() => {
        runnin.sendText('🚬 ☁');
      }, 3000);
      setTimeout(() => {
        runnin.sendText('🚬 ');
      }, 3500);    
};

exports.help = {
  name: "Google",
  description: "Show the bot's commands list",
  usage: "google",
  cooldown: 5,
};
