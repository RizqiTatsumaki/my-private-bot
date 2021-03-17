// panggil konfigurasi di file .env
require("dotenv").config();
// Panggil library
const {
  WAConnection,
  MessageType,
  isGroupID,
} = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
// Ngambil collections di Database
const { queue, active_sessions } = require("./app/config/database");
const config = require("./app/config/values.json");
const { msgFilter } = require(process.cwd() + "/msgFilter");
//Fimgsi handler
const handler = {
  error: "Terjadi error, report ke admin !!",
  sukses: "Berhasil !!",
  diGrup: "Kamu berada di grup, tidak bisa menggunakan anonymous chat !!",
};
// Fungsi Helper
const helper = require("./app/helper/helper");

// nganbil prefix
// Moment buat ngambil tanggal
const moment = require("moment");

// Start Pooling bot
// lakukan fungsi di bawah kalo ada pesan ke bot
const availableCommands = new Set();
fs.readdir("./app/cmds", (e, files) => {
  if (e) return console.error(e);
  files.forEach((commandFile) => {
    availableCommands.add(commandFile.replace(".js", ""));
  });
});

async function starts() {
  const zef = new WAConnection();
  zef.logger.level = "warn";

  zef.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("[!] Scan  qr code dengan whatsapp");
  });

  zef.on("credentials-updated", () => {
    const authinfo = zef.base64EncodedAuthInfo();
    console.log("[!] Credentials Updated");

    fs.writeFileSync(
      "./bot_session.json",
      JSON.stringify(authinfo, null, "\t")
    );
  });

  fs.existsSync("./bot_session.json") && zef.loadAuthInfo("./bot_session.json");

  zef.on("connecting", async function () {
    console.log("[!] Connecting");
  });
  zef.on("close", async function (cls) {
    console.log(`[!] Bot closed...\nReason: ${cls.reason}`);
  });
  zef.on("ws-close", async function (cls) {
    console.log(`[!] Bot closed...\nReason: ${cls.reason}`);
  });
  zef.on("open", async () => {
    console.log("[!] Bot Is Online Now!!");
  });
  await zef.connect();

  zef.on("chat-update", async (msg) => {
    try {
      // Jika tidak menerima pesan baru
      if (!msg.hasNewMessage) return;
      msg = JSON.parse(JSON.stringify(msg)).messages[0];

      if (!msg.message) return;
      if (msg.key && msg.key.remoteJid == "status@​broadcast") return;

      const from = msg.key.remoteJid;
      zef.isGroup = from.endsWith("@​g.us");
      const type = Object.keys(msg.message)[0];
      zef.id = zef.isGroup ? msg.participant : msg.key.remoteJid;

      const { text } = MessageType;

      let defaultPrefix = "/";

      let prefixes = JSON.parse(
        fs.readFileSync("./app/database/prefixes.json", "utf8")
      );
      if (!prefixes[from]) {
        prefixes[from] = {
          prefixes: defaultPrefix,
        };
      }

      zef.prefix = prefixes[from].prefixes;

      global.prefix;

      body =
        type === "conversation" &&
        msg.message.conversation.startsWith(zef.prefix)
          ? msg.message.conversation
          : type == "imageMessage" &&
            msg.message.imageMessage.caption.startsWith(zef.prefix)
          ? msg.message.imageMessage.caption
          : type == "videoMessage" &&
            msg.message.videoMessage.caption.startsWith(zef.prefix)
          ? msg.message.videoMessage.caption
          : type == "extendedTextMessage" &&
            msg.message.extendedTextMessage.text.startsWith(zef.prefix)
          ? msg.message.extendedTextMessage.text
          : "";

      const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase();
      const args = body.trim().split(/ +/).slice(1);
      const isCmd = body.startsWith(zef.prefix);
      zef.totalchat = await zef.chats.all();
      let pushname =
        zef.contacts[zef.id] != undefined
          ? zef.contacts[zef.id].vname || zef.contacts[zef.id].notify || "-"
          : undefined;

      const getGroupAdmins = (participants) => {
        admins = [];
        for (let i of participants) {
          i.isAdmin ? admins.push(i.jid) : "";
        }
        return admins;
      };

      zef.groupMetadata2 = zef.isGroup ? await zef.groupMetadata(from) : "";
      zef.groupName = zef.isGroup ? zef.groupMetadata2.subject : "";
      zef.groupId = zef.isGroup ? zef.groupMetadata2.id : "";
      zef.groupMembers = zef.isGroup ? zef.groupMetadata2.participants : "";
      zef.groupAdmins = zef.isGroup ? getGroupAdmins(zef.groupMembers) : "";
      zef.isGroupAdmins = zef.groupAdmins.includes(zef.id) || false;
      zef.isMedia =
        type === "imageMessage" ||
        type === "videoMessage" ||
        type === "audioMessage";

      const content = JSON.stringify(msg.message);

      zef.isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      zef.isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      zef.isQuotedAudio =
        type === "extendedTextMessage" && content.includes("audioMessage");
      zef.isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");
      zef.isQuotedMessage =
        type === "extendedTextMessage" && content.includes("conversation");

      zef.sendText = (teks) => {
        zef.sendMessage(from, teks, text);
      };
      zef.reply = (f, teks) => {
        zef.sendMessage(f, teks, text, { quoted: msg });
      };
      zef.pushname = pushname;
      zef.config = config;

      if (availableCommands.has(argv)) {
        if (msgFilter.isFiltered(zef.id))
          return zef.reply(
            from,
            "Tunggu 10 detik untuk menggunakan command lagi !!"
          );
        if (
          zef.id !== zef.config.developer.ibnu &&
          zef.id !== zef.config.developer.zefian &&
          zef.id !== zef.config.developer.rizqi &&
          zef.id !== zef.config.developer.bot
        )
          msgFilter.addFilter(zef.id);
        require(`./app/cmds/${argv}`).run(zef, msg, args, from);
        console.log(availableCommands);
        console.log(
          `${zef.pushname} atau ${
            zef.id.split("@")[0]
          } Mengguunakan command ${argv}`
        );
        console.log(msgFilter);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

starts();
