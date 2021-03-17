const { exec } = require("child_process");

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

exports.run = (zef, message, args, from) => {
  if (
    zef.id !== zef.config.developer.ibnu &&
    zef.id !== zef.config.developer.zefian &&
    zef.id !== zef.config.developer.rizqi &&
    zef.id !== zef.config.developer.bot
  ) return zef.reply("just owner");
  
  if (args.length < 1) return zef.reply("masukan command")
  let command = args.join(" ")
  exec(command, (err, res) => {
      if (err) console.log(err)
      zef.reply(res)
  })
};

exports.help = {
  name: "Shell",
  description: "",
  usage: "shell",
  cooldown: 5,
  kategori: "owner",
};
