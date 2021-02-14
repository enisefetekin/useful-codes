const { Discord , MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const db = new qdb.table("filterayarlar");

module.exports = async (message) => {
	let filterayar = await db.get(`filterayar.${message.guild.id}`);
    let word = filterayar.filteredword;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Cod").setTimestamp();
    if (word.some(word => message.content.includes(word))) {
        message.channel.send(embed.setDescription("Mesajında  **Filtrelenmiş** Sözcük Bulundu!"));
        message.delete({timeout:1});
    };
}

module.exports.configuration = {
    name: "message"
  }
