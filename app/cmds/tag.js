const { readdir } = require('fs')
const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (zef, msg, args, from, runnin) => {
    if (!runnin.isGroup) return runnin.reply("Command tidak dibuat untuk private chat")
    if (
      runnin.groupMetadata.id != "6282299265151-1609242374@g.us" &&
      runnin.groupMetadata.id != "6281294958473-1603530185@g.us"
    ) { runnin.reply("Command tidak dibuat untuk grup ini !!") }
    if (!args[0]) return runnin.reply("list id: tanya, caratanya, error\nother: annoying")
      switch(args[0]){
        case "error":
          runnin.reply('Kalau ingin bertanya "kenapa error begini?"\n*Akan jauh lebih baik jika kalian sertakan:*\n- Error di-line keberapa\n- Error name\n- Codingan kalian\n- Kalau bisa screenshot/kirim code.')
    break;
        case "caratanya":
          runnin.reply("_*Cara Bertanya*_\n1. Defenisikan permasalahan\n_<saya ada masalah nih sama ini>_\n2. Lalu (jika ada) sertakan usaha yang sudah kalian kerjakan\n_<ini codingan saya>_\n3. Setelah itu beritahu apa yang seharusnya program kalian jalankan, dan beritahu juga apa yang malah program kalian jalankan\n_<harusnya dia gini, tapi malah gitu>_ ")
    break;
        case "tanya":
          runnin.reply('*Jangan tanyakan "apakah ada yang bisa bantu saya?" Tapi tanyakan langsung permasalahan kalian. Yang lain akan menjawab secepat dan setepat mungkin tanpa harus anda tanyakan bisa atau tidak.* ')
    break;
        case "annoying":
          runnin.reply(`_*DILARANG:*_\n- DM\n- SPAM\nKE PARA STAFF ATAUPUN MEMBER LAINNYA HANYA UNTUK MEMINTA BANTUAN!\nDISINI KAMI AKAN MEMBANTU SEBISANYA, JADI CUKUP:\n- TANYAKAN SAJA PEMASALAHAN APA (${prefix}tag caratanya)\n- GUNAKAN BAHASA YANG MUDAH DI MENGERTI\n\nKAMI BUKAN PEMBANTU KALIAN, KITA DISINI PERKUMPULAN (COMMUNITY)`)
    break;
    default:
      runnin.reply("Tag tidak ada !")
      }
}

exports.help = {
    name: "Tag",
    description: "",
    usage: `tag  <something>`,
    cooldown: 5,
    kategori: "util",
};