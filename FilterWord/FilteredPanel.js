const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const conf = require('../ayarlar.json');
const db = new qdb.table("filterayarlar");

module.exports.execute = async (client, message, args) => {
  if(!conf.sahip.includes(message.author.id))
    if((message.guild.ownerID != message.author.id)) return message.channel.send("**Bunu yapmak için yeterli yetkin yok!**");
  let ozellikler = [
    { name: "filteredword", type: "cogul"},
  ];
  let secim = args[0];
  const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter("Enis");
  if (secim == "liste") {
    let data = await db.get(`filterayar.${message.guild.id}`);
    let ozelliklerListe = Object.keys(data || {}).filter(a => ozellikler.find(v => v.name == a)).map(o => {
      let element = data[o];
      let ozellik = ozellikler.find(z => z.name == o);
      if(ozellik.type == "cogul") return `\`${o}\` - ${element.map(tag => `${tag}`).join(', ')}`
      
    }).join('\n');
    return message.channel.send(embed.setDescription(ozelliklerListe));
  };
  if (!secim || !ozellikler.some(ozellik => ozellik.name.toLowerCase() == secim.toLowerCase())) return message.channel.send(embed.setDescription(`Bir hata yaptın! Filtrelenmiş Sözcükleri Listeletmek İstiyorsan; **liste** \n\n ${ozellikler.map(o => `\`${o.name}\``).join(", ")} kullanabilirsin.`));
  let ozellik = ozellikler.find(o => o.name.toLowerCase() === secim.toLowerCase());
    if (ozellik.type == "cogul"){
    let tag = args.splice(1).join(' ');
    if(!tag) return message.channel.send(embed.setDescription("**Değer belirtmeyi unuttun!**"));
    let arr = await db.get(`filterayar.${message.guild.id}.${ozellik.name}`) || [];
    let index = arr.find(e => e == tag);
    if(index) arr.splice(arr.indexOf(tag), 1);
    else arr.push(tag);
    db.set(`filterayar.${message.guild.id}.${ozellik.name}`, arr);
    return message.channel.send(embed.setDescription(`Belirttiğin ayar tanımlandı. Mevcut ayarında \`${arr.join(", ")}\` bulunmakta.`));
  }
};

module.exports.configuration = {
    name: "filterpanel",
    aliases: ["filtrepanel", "filtrepaneli"],
    usage: "filterpanel [filteredword] [kelime]",
    description: "Server Settings"
};
