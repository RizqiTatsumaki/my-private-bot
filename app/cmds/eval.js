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
  if (runnin.id != "6289630171792@s.whatsapp.net") return runnin.reply("just owner")
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
    zef.sendMessage(from, (clean(evaled)), text);
  } catch (err) {
    runnin.sendText(`${clean(err)}`);
  }
};

exports.help = {
  name: "Eval",
  description: "Show the bot's commands list",
  usage: "eval",
  cooldown: 5,
};
