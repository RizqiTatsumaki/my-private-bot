const fs = require('fs')

const { MessageType } = require("@adiwajshing/baileys");
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

exports.run = (zef, message, args, from, runnin) => {
    if (!runnin.isGroup) return runnin.reply("hanya grup")
    if (!args[0]) return runnin.reply('Usage: !prefix <desired prefix here>')
    let prefixes = JSON.parse(fs.readFileSync("./app/database/prefixes.json"));

    prefixes[from] = {
        prefixes: args[0]
      };
    fs.writeFileSync("./app/database/prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err);
    });

    runnin.reply(`Succses set prefix to ${args[0]}`)
    
};

exports.help = {
  name: "Ping",
  description: "PING PONG",
  usage: "ping",
  cooldown: 5,
  kategori: "util",
};
