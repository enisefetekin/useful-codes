const Discord = require('discord.js');
const qdb = require("quick.db");
const db = new qdb.table("filterayarlar");

module.exports = async (message) => {
    let filteredword = await db.get("filterayar.filteredword");
    if (message.content.includes(`${filteredword}`)) {
        message.channel.send(`Mesajında Filtrelenmiş İçerik Bulundu!`)
        message.delete();
    };
}

module.exports.configuration = {
    name: "message"
  }