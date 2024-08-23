const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, ActivityType, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, Guild } = require("discord.js");
const { General, BList, BlPerma, welcomis } = require("../../Database/index");


module.exports = {
    name: 'messageCreate',
    run: async (message, client) =>{
        if(message.author.bot) return;

        let reactssCanal = General.get(`reagirCAnal`)
        let reactssEmoji = General.get(`reagirEMoji`)
        let reactss = General.get(`systemReact`)

        if(reactss === true){
        if (message.channel.id === `${reactssCanal}`) {
            try {
              await message.react(`${reactssEmoji}`);
            } catch (error) {
              console.error('Erro ao reagir', error);
            }
          }
        }


        let sugestoes = General.get(`systemSuggestion`)
        let sugestoescanal = General.get(`suggestionChannel`)
        let sugestoesemoji = General.get(`suggestionEEmoji`)
        let sugestoesMSG = General.get(`suggestionMSNG`)

        if(sugestoes === true){
        if (message.channel.id === `${sugestoescanal}`) {
            try {
              await message.react(`${sugestoesemoji}`);
        
              const suggestion = await message.startThread({
                name: `Sugestão de: ${message.author.username}`,
                autoArchiveDuration: 1440, 
                type: 'GUILD_PUBLIC_THREAD', 
              });
              suggestion.send({content:`${sugestoesMSG}`});
            } catch (error) {
              console.error('Erro ao reagir ou criar tópico', error);
            }
          }
        }
    }
}