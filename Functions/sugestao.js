const { ApplicationCommandType, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { General } = require("../Database/index");
const startTime = Date.now();

async function sugestao(client, interaction) {

    interaction.update({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Sistema de Sugestões`, iconURL: "https://cdn.discordapp.com/emojis/1267381920333955112.webp?size=96&quality=lossless" })
                .setDescription(`- Selecione abaixo a opção que deseja configurar.\n
**Canal de Sugestões:** ${General.get(`suggestionChannel`) == null ? `\`Não definido\`` : `<#${General.get(`suggestionChannel`)}>`}
**Emoji para reagir:** ${General.get(`suggestionEEmoji`) == null ? `\`Não definido\`` : `${General.get(`suggestionEEmoji`)}`}
                `)
                .setColor(General.get("oficecolor") || "#FF8201")
                .setFooter({ text: `${interaction.guild.name} ©️ Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('onoffSuggestion')
                        .setLabel(General.get(`systemSuggestion`) === false ? 'Ligar' : 'Desligar')
                        .setStyle(General.get(`systemSuggestion`) === false ? 3 :  4 )
                        .setEmoji('1262641839383515157'),
                        new ButtonBuilder()
                        .setCustomId('channelSuggestion')
                        .setLabel('Canal de Sugestões')
                        .setStyle(1)
                        .setEmoji('1271659788614373399'),
                        new ButtonBuilder()
                        .setCustomId('emojiSuggestion')
                        .setLabel('Definir Emoji')
                        .setStyle(1)
                        .setEmoji('1271659788614373399')
                ),
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('msgSuggestion')
                .setLabel('Mensagem dentro da Sugestão')
                .setStyle(1)
                .setEmoji('1262641752314089513'),
                new ButtonBuilder()
                .setCustomId('voltar1')
                .setLabel('Voltar')
                .setStyle(2)
                .setEmoji('1251441490576805979'),
            )
        ],
        ephemeral: true
    });
    
}

module.exports = {
    sugestao
}