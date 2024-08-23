const { ApplicationCommandType, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { General } = require("../../Database/index");
const startTime = Date.now();

function cumprimento() {
    const horabrasil = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    const hora = new Date(horabrasil).getHours();

    if (hora < 12) {
        return 'Bom dia';
    } else if (hora < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}

module.exports = {
    name: "settings",
    description: "[STAFF] Clique para configurar",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (interaction.user.id !== General.get('owner')) {
            interaction.reply({
                content: `Espere! Você não tem permissão para usar este comando`, ephemeral: true
            });
            return;
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Configurações`, iconURL: "https://cdn.discordapp.com/emojis/1267381921856360468.webp?size=96&quality=lossless" })
                    .setDescription(`${cumprimento()} Sr(a) **${interaction.user.username}**.\n\n- Selecione abaixo a opção que deseja configurar.`)
                    .setColor(General.get("oficecolor") || "#FF8201")
                    .setFooter({ text: `${interaction.guild.name} ©️ Todos os direitos reservados.`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('gerenciarAutoreact')
                            .setLabel('Auto Reação')
                            .setStyle(1)
                            .setEmoji('1257021878078279721'),
                            new ButtonBuilder()
                            .setCustomId('systemSugestao')
                            .setLabel('Sistema de Sugestões')
                            .setStyle(1)
                            .setEmoji('1269411458995851274'),
                            new ButtonBuilder()
                            .setCustomId('mudarCor')
                            .setLabel('Definir Cor Principal')
                            .setStyle(1)
                            .setEmoji('1263226754739343531')
                    )
            ],
            ephemeral: true
        });
    }
};
