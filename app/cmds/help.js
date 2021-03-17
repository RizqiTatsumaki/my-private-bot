const { readdir } = require("fs");
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

exports.run = (zef, msg, args, from) => {
  let tmpFile = {};
  readdir(process.cwd() + "/app/cmds", (err, files) => {
    if (err) throw err;
    files.forEach((jsFile) => {
      const cmdFile = require(`./${jsFile}`);
      tmpFile[jsFile.replace(".js", "")] = {};
      tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
      tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
      tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
    });
    if (!args[0]) {
      var h = Object.keys(tmpFile);
      var hasilSort = h.sort((a, b) => (a == b ? 0 : a > b ? 1 : -1));
      zef.sendMessage(
        from,
        `Hai ${zef.pushname}\nPrefix: ${
          zef.prefix
        }\n\n*Available commands:*\n${hasilSort.join(
          "\n"
        )}\n\n_You can run *${zef.prefix}help <command name>* to show advanced help._`,
        text,
        { quoted: msg }
      );
    } else {
      const commandName = args[0];
      let { name, description, usage } = require(`./${commandName}.js`).help;
      if (name == "") name = "no name"
      if (description == "") description = "no description"
      if (usage == "") usage = "no usage"
      zef.sendMessage(
        from,
        `*${name}*\n\nDescription: ${description}\nUsage: \`\`\`${zef.prefix}${usage}\`\`\``,
        text,
        { quoted: msg }
      );
    }
  });
};

exports.help = {
  name: "Help",
  description: "Show the bot's commands list",
  usage: "help",
  cooldown: 5,
};
