const Discord = require('discord.js');
const qdb = require("quick.db");
const db = new qdb.table("filterayarlar");

module.exports = async (message) => {
    let filterayar = await db.get("filterayar");
    let word = filterayar.filteredword;
    if (word.some(word => message.content.includes(word))) {
        message.channel.send(`Mesajında Filtrelenmiş İçerik Bulundu!`)
        message.delete();
    };
}

module.exports.configuration = {
    name: "message"
  }
