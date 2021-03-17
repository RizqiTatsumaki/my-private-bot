const fs = require("fs");

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
  if (!zef.isGroupAdmins) return zef.reply("admin grup");
  if (!zef.isGroup) return zef.reply("hanya grup");
  if (!args[0])
    return zef.reply(`Usage: ${zef.prefix}setprefix <desired prefix here>`);
  let prefixes = JSON.parse(fs.readFileSync("./app/database/prefixes.json"));

  prefixes[from] = {
    prefixes: args[0],
  };
  fs.writeFileSync(
    "./app/database/prefixes.json",
    JSON.stringify(prefixes),
    (err) => {
      if (err) console.log(err);
    }
  );

  zef.reply(`Succses set prefix to ${args[0]}`);
};

exports.help = {
  name: "Ping",
  description: "PING PONG",
  usage: "ping",
  cooldown: 5,
  kategori: "util",
};
