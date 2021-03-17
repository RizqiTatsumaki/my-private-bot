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

exports.run = async (zef, msg, args, from, runnin) => {
  if (
    zef.id !== zef.config.developer.ibnu &&
    zef.id !== zef.config.developer.zefian &&
    zef.id !== zef.config.developer.rizqi &&
    zef.id !== zef.config.developer.bot
  )
    return zef.reply("just owner");
  if (args.length < 1) return zef.reply("masukan teks");
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    zef.sendMessage(from, clean(evaled), text);
  } catch (err) {
    zef.sendText(`${clean(err)}`);
  }
};

exports.help = {
  name: "Eval",
  description: "",
  usage: `eval  <something>`,
  cooldown: 5,
  kategori: "owner",
};
