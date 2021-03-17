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
    setTimeout(() => {
        zef.sendText('🚬');
      }, 500);
      setTimeout(() => {
        zef.sendText('🚬 ☁ ');
      }, 1000);
      setTimeout(() => {
        zef.sendText('🚬 ☁☁ ');
      }, 1500);
      setTimeout(() => {
        zef.sendText('🚬 ☁☁☁ ');
      }, 2000);
      setTimeout(() => {
        zef.sendText('🚬 ☁☁');
      }, 2500);
      setTimeout(() => {
        zef.sendText('🚬 ☁');
      }, 3000);
      setTimeout(() => {
        zef.sendText('🚬 ');
      }, 3500);    
};

exports.help = {
  name: "Smoke",
  description: "",
  usage: "smoke",
  cooldown: 5,
  kategori: 'fun',
};
