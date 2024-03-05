require('dotenv').config();
const { Client, IntentsBitField, ActivityType  } = require("discord.js");

const client = new Client({intents: new IntentsBitField(3276799)});


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{
      name: "Bot by TuturP33",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/tuturp33"
    }]
  });
});


client.on("messageCreate", (message) => {
  const prefix = "+"; 

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  if (command === "dmall") {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You do not have permission to use this command");
    const msg = args.join(" ");
    message.guild.members.cache.forEach(member => {
      member.send(msg).catch(() => {});
    });
    message.reply("Message sent to all members");
  }
});


client.login(process.env.TOKEN);