const { exec } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const { MessageType } = require("@adiwajshing/baileys");
const { Z_BUF_ERROR, Z_FILTERED } = require("zlib");
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

exports.run = async (zef, msg, args, from) => {
  try {
  if (args[0] == "help")
    return zef.reply(
      `kirim image atau video kasih caption ${zef.prefix}stiker\nbisa juga reply image atau video dengan teks ${zef.prefix}stiker\n\nNote: video harus dibawah 11 detik`
    );
  let authorname =
    zef.contacts[from] != undefined
      ? zef.contacts[zef.id].vname || zef.contacts[zef.id].notify
      : undefined;
  const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
  };

  function addMetadata(packname, author) {
    if (!packname) packname = "Zefian";
    if (!author) author = "Bot";
    author = author.replace(/[^a-zA-Z0-9]/g, "");
    let name = `${author}_${packname}`;
    if (fs.existsSync(`./trash/${name}.exif`)) return `./trash/${name}.exif`;
    const json = {
      "sticker-pack-name": packname,
      "sticker-pack-publisher": author,
    };
    const littleEndian = Buffer.from([
      0x49,
      0x49,
      0x2a,
      0x00,
      0x08,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x41,
      0x57,
      0x07,
      0x00,
    ]);
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];

    let len = JSON.stringify(json).length;
    let last;

    if (len > 256) {
      len = len - 256;
      bytes.unshift(0x01);
    } else {
      bytes.unshift(0x00);
    }

    if (len < 16) {
      last = len.toString(16);
      last = "0" + len;
    } else {
      last = len.toString(16);
    }

    const buf2 = Buffer.from(last, "hex");
    const buf3 = Buffer.from(bytes);
    const buf4 = Buffer.from(JSON.stringify(json));

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);

    fs.writeFile(`./trash/${name}.exif`, buffer, (err) => {
      return `./trash/${name}.exif`;
    });
  }

  if (
    ((zef.isMedia && !msg.message.videoMessage) || zef.isQuotedImage) &&
    args.length == 0
  ) {
    zef.reply("bentar");
    const encmedia = zef.isQuotedImage
      ? JSON.parse(JSON.stringify(msg).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo
      : msg;
    const media = await zef.downloadAndSaveMediaMessage(encmedia);
    ran = getRandom(".webp");
    ffmpeg(`./${media}`)
      .input(media)
      .on("start", function (cmd) {
        console.log(`Started : ${cmd}`);
      })
      .on("error", function (err) {
        console.log(`Error : ${err}`);
        fs.unlinkSync(media);
        zef.reply("gagal");
      })
      .on("end", function () {
        console.log("Finish");
        exec(
          `webpmux -set exif ${addMetadata(
            "Zefian",
            "Rizqi"
          )} ./trash/${ran} -o ./trash/${ran}`,
          async (error) => {
            if (error) console.log(error);
            if (error) return zef.reply("Gagal");
            zef.sendMessage(from, fs.readFileSync(`./trash/${ran}`), sticker, {
              quoted: msg,
            });
            fs.unlinkSync(media);
            fs.unlinkSync(`./trash/${ran}`);
          }
        );
      })
      .addOutputOptions([
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
      ])
      .toFormat("webp")
      .save(`./trash/${ran}`);
  } else if (
    ((zef.isMedia && msg.message.videoMessage.seconds < 11) ||
      (zef.isQuotedVideo &&
        msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
          .seconds < 11)) &&
    args.length == 0
  ) {
    zef.reply("bentar");
    const encmedia = zef.isQuotedVideo
      ? JSON.parse(JSON.stringify(msg).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo
      : msg;
    const media = await zef.downloadAndSaveMediaMessage(encmedia);
    ran = getRandom(".webp");
    ffmpeg(`./${media}`)
      .inputFormat(media.split(".")[1])
      .on("start", function (cmd) {
        console.log(`Started : ${cmd}`);
      })
      .on("error", function (err) {
        console.log(`Error : ${err}`);
        fs.unlinkSync(media);
        zef.reply("gagal");
      })
      .on("end", function () {
        console.log("Finish");
        zef.sendMessage(from, fs.readFileSync(`./trash/${ran}`), sticker, {
          quoted: msg,
        });
        fs.unlinkSync(media);
        fs.unlinkSync(`./trash/${ran}`);
      })
      .addOutputOptions([
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
      ])
      .toFormat("webp")
      .save(`./trash/${ran}`);
  }
} catch (e){
  console.info("Pasti error this.isZero")
}
};

exports.help = {
  name: "Shell",
  description: "",
  usage: "shell",
  cooldown: 5,
  kategori: "owner",
};
