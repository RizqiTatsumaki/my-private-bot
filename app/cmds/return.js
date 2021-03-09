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
  )
    return runnin.reply("just owner");
  runnin.reply(JSON.stringify(eval(message, null, "	")));
};

exports.help = {
  name: "return",
  description: "RETURN MESSAGE",
  usage: "return",
  cooldown: 5,
};
