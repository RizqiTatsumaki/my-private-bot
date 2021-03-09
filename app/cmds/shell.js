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

exports.run = (zef, message, args, from, runnin) => {
  if (
    runnin.id !== runnin.config.developer.ibnu &&
    runnin.id !== runnin.config.developer.zefian &&
    runnin.id !== runnin.config.developer.rizqi &&
    runnin.id !== runnin.config.developer.bot
  ) return runnin.reply("just owner");

  if (args.length < 1) return runnin.reply("masukan command")
  let command = args.join(" ")
  exec(command, (err, res) => {
      if (err) console.log(err)
      runnin.reply(res)
  })
};

exports.help = {
  name: "Shell",
  description: "",
  usage: "shell",
  cooldown: 5,
  kategori: "owner",
};
