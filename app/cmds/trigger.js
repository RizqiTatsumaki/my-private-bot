const fs = require("fs");
const request = require("request");
const axios = require("axios");
const { Canvas } = require("canvacord");
const ffmpeg = require("fluent-ffmpeg");

const { MessageType, Mimetype } = require("@adiwajshing/baileys");
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
  const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };
  try {
    var pict = await zef.getProfilePicture(runnin.id);
  } catch {
    var pict =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
  }

  var fileName = Math.random().toString(36).substring(7);

  var img = await getBuffer(pict);
  fs.writeFileSync(`./trash/img_usr/${runnin.pushname}.png`, img);

  var ambil = await Canvas.trigger(img);
  await fs.writeFileSync(`./trash/${msg.key.id}.gif`, ambil);
  ffmpeg(`./trash/${msg.key.id}.gif`)
    .on("start", function (cmd) {
      console.log(`Started : ${cmd}`);
    })
    .on("error", function (err) {
      console.log(`Error : ${err}`);
      fs.unlinkSync(`./trash/${msg.key.id}.gif`);
      runnin.reply("Error");
    })
    .on("end", function () {
      console.log("Finish");
      zef.sendMessage(from, fs.readFileSync(`./trash/${msg.key.id}.mp4`), video, {mimetype: 'video/gif', gifPlayback: true, gifAttribution: 'GIPHY'})
      fs.unlinkSync(`./trash/${msg.key.id}.gif`)
      fs.unlinkSync(`./trash/${msg.key.id}.mp4`)
    })
    .addOutputOptions([
      "-pix_fmt yuv420p",
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    ])
    .save(`./trash/${msg.key.id}.mp4`);
};

exports.help = {
  name: "Tag",
  description: "",
  usage: `tag  <something>`,
  cooldown: 5,
  kategori: "util",
};
