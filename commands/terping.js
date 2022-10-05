const { roleMention } = require("discord.js");

module.exports = {
  name: "terping",
  description: "adds reaction roles",
  once: "true",
  async execute(message, args, client, Discord) {
    const channel = "982861982279536640";
    const purple = message.guild.roles.cache.find(
      (role) => role.name === "Purple"
    );
    const aquamarine = message.guild.role.cache.find(
      (role) => role.name === "Aquamarine"
    );

    const purpleEmoji = "1027123614002204684";
    const aquaEmoji = "1027123701788983387";

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle("Terror zone pinger")
      .setDescription(
        "React to choose which zones you wanted to be pinged for!\n\n" +
          `${purpleEmoji} for chaos\n` +
          `${aquaEmoji} for WSK`
      );

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(purpleEmoji);
    messageEmbed.react(aquaEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name === purpleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add("Purple");
        }
        if (reaction.emoji.name === aquaEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add("Aqua");
        }
      } else return;
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name === purpleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove("Purple");
        }
        if (reaction.emoji.name === aquaEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove("Aqua");
        }
      } else return;
    });
  },
};
