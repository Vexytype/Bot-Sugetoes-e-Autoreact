const { ApplicationCommandType, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { General } = require("../Database/index");
const startTime = Date.now();

async function react(client, interaction) {
    
    interaction.update({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Sistema de Reação`, iconURL: "https://cdn.discordapp.com/emojis/1265508950858793001.webp?size=96&quality=lossless" })
                .setDescription(`- Selecione abaixo a opção que deseja configurar.\n
**Canal com Reações:** ${General.get(`reagirCAnal`) == null ? `\`Não definido\`` : `<#${General.get(`reagirCAnal`)}>`}
**Emoji para reagir:** ${General.get(`reagirEMoji`) == null ? `\`Não definido\`` : `${General.get(`reagirEMoji`)}`}
                    `)
                .setColor(General.get("oficecolor") || "#FF8201")
                .setFooter({ text: `${interaction.guild.name} ©️ Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('onoffReact')
                        .setLabel(General.get(`systemReact`) === false ? 'Ligar' : 'Desligar')
                        .setStyle(General.get(`systemReact`) === false ? 3 :  4 )
                        .setEmoji('1262641839383515157'),
                        new ButtonBuilder()
                        .setCustomId('channelReact')
                        .setLabel('Canal para Reações')
                        .setStyle(1)
                        .setEmoji('1271659788614373399'),
                        new ButtonBuilder()
                        .setCustomId('emojiReact')
                        .setLabel('Definir Emoji')
                        .setStyle(1)
                        .setEmoji('1271659788614373399')
                ),
            new ActionRowBuilder()
            .addComponents(
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
    react
}