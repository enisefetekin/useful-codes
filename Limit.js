const { MessageEmbed } = require('discord.js')
const LimitJson = require("../limit.json"); // We need to specify the location of the json file from which we will get the information.

const Settings = LimitJson.PrivateRoom; // We will set the name of the sub-category where we will pull the information.

module.exports.execute = async (client, message, args) => {

let voiceroom = message.guild.channels.cache.get(Settings.Room);
let member = message.member.voice.channel;
if(!voiceroom) return message.reply(`No private room channel has been settled on this server!`)
if(member.name !=  `${Settings.Symbol} ${message.member.displayName}`) return message.channel.send("**This Command Only For Your Priv Room**"); //member.name must be equal to the channel name to be created for people otherwise the command will not run.
let limitnumber = args[0]
if(isNaN(limitnumber) || !limitnumber) return message.reply(`You must enter a number!`)
if(limitnumber > 99) return message.reply(`You have to specify a limit number between 0-99.`)
//options.userLimit
await member.edit({userLimit : limitnumber})
if(limitnumber == 0) limitnumber = "No Limit"
message.reply(`Your user limit is set to **${limitnumber}**`)
}


module.exports.settings = {
    Commands: ["limit", "lim", "vlimit"],
    Usage: "limit <limitnumber>",
    Description: "Limit",
    Category: "Useable",
    Activity: true
}