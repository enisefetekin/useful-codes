const { Discord , MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const db = new qdb.table("filterayarlar");

module.exports = async (message) => {
    let filterayar = await db.get(`filterayar.${message.guild.id}`);
    let word = filterayar.filteredword;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Coded By Enis").setTimestamp();
    if (db.get(`filterayar.${message.guild.id}`) && word.some(word => message.content.includes(word))) {
        message.delete({timeout:100});
        message.channel.send(embed.setDescription("Mesajında  **Filtrelenmiş** Sözcük Bulundu!")).then(x => x.delete({timeout: 5000}));
    };
}

module.exports.configuration = {
    name: "message"
  }
