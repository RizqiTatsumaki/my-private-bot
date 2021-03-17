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
    //zef.id !== zef.config.developer.rizqi &&
    zef.id !== zef.config.developer.bot
  )
    return zef.reply("just owner");
  zef.reply(JSON.stringify(eval(message, null, "	")));
};

exports.help = {
  name: "return",
  description: "RETURN MESSAGE",
  usage: "return",
  cooldown: 5,
};
