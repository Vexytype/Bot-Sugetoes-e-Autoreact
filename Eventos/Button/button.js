const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const { General } = require("../../Database/index");
const { react } = require("../../Functions/autoreact")
const { sugestao } = require("../../Functions/sugestao")
const { config } = require("../../Functions/config")

module.exports = {
    name:"interactionCreate", 
    run: async( interaction, client) => {

        const customId = interaction.customId;
        const inteButton = interaction.isButton();
        const channelSelect = interaction.isChannelSelectMenu();
        const modais = interaction.isModalSubmit();

        if(inteButton){
            if(customId === "gerenciarAutoreact"){
                react(client, interaction);
            }
            if(customId === "systemSugestao"){
                sugestao(client, interaction);
            }
            if(customId === "voltar1"){
                config(client, interaction);
            }
            if(customId === "voltar2"){
                sugestao(client, interaction);
            }
            if(customId === "voltar3"){
                react(client, interaction);
            }
            if (customId === "onoffSuggestion") {
                const sugestoes = General.get(`systemSuggestion`)
                const sugestoescanal = General.get(`suggestionChannel`)
                const sugestoesemoji = General.get(`suggestionEEmoji`)
                const sugestoesMSG = General.get(`suggestionMSNG`)
                if(sugestoescanal === null || sugestoesemoji === null || sugestoesMSG === null){
                    return interaction.reply({content:`O canal o emoji e a mensagem devem ser definido antes de ligar o sistema.`, ephemeral:true});
                }
                if(sugestoes == true){
                    General.set(`systemSuggestion`, false)
                    await sugestao(client, interaction);
                }
                if(sugestoes == false){
                    General.set(`systemSuggestion`, true)
                    await sugestao(client, interaction);
                }
            }
            if (customId === "onoffReact") {
                const reactss = General.get(`systemReact`)
                const reactssCanal = General.get(`reagirCAnal`)
                const reactssEmoji = General.get(`reagirEMoji`)
                if(reactssCanal === null || reactssEmoji === null){
                    return interaction.reply({content:`O canal e o emoji deve ser definido antes de ligar o sistema.`, ephemeral:true});
                }
                if(reactss == true){
                    General.set(`systemReact`, false)
                    await react(client, interaction);
                }
                if(reactss == false){
                    General.set(`systemReact`, true)
                    await react(client, interaction);
                }
            }
            if(customId === "emojiSuggestion"){
                
                const modal = new ModalBuilder()
                .setCustomId(`modalEmojisuggestion`)
                .setTitle('Definir um Emoji para reagir');

                const emojiInput = new TextInputBuilder()
                .setCustomId('emojiparaReagirsuggestions')
                .setLabel('Emoji')
                .setPlaceholder('Insira um Emoji válido')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

                modal.addComponents(new ActionRowBuilder().addComponents(emojiInput))
                await interaction.showModal(modal);
            }
            if (customId === "channelSuggestion") {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`- Selecione abaixo o Canal que deseja setar como **Canal de Sugestões**.`)
                    .setColor(General.get("oficecolor") || "#FF8201")
                    .setFooter({ text: `${interaction.guild.name} ©️ Todos os direitos reservados.`, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();

                const components = [
                    new ActionRowBuilder()
                        .addComponents(
                            new ChannelSelectMenuBuilder()
                                .setCustomId(`channelSugestaoSelect`)
                                .setPlaceholder(`Selecione um Canal`)
                                .setMaxValues(1)
                                .setChannelTypes(ChannelType.GuildText)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`voltar2`).setLabel(`Voltar`).setEmoji(`1251441490576805979`).setStyle(2)
                        )
                ];

                interaction.update({
                    embeds: [embed],
                    components: components
                });
            }
            if (customId === "channelReact") {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`- Selecione abaixo o Canal que deseja setar como **Canal com Reações**.`)
                    .setColor(General.get("oficecolor") || "#FF8201")
                    .setFooter({ text: `${interaction.guild.name} ©️ Todos os direitos reservados.`, iconURL: interaction.guild.iconURL() })
                    .setTimestamp();

                const components = [
                    new ActionRowBuilder()
                        .addComponents(
                            new ChannelSelectMenuBuilder()
                                .setCustomId(`channelReactSelect`)
                                .setPlaceholder(`Selecione um Canal`)
                                .setMaxValues(1)
                                .setChannelTypes(ChannelType.GuildText)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`voltar3`).setLabel(`Voltar`).setEmoji(`1251441490576805979`).setStyle(2)
                        )
                ];

                interaction.update({
                    embeds: [embed],
                    components: components
                });
            }
            if(customId === "emojiReact"){

                const modal = new ModalBuilder()
                .setCustomId(`modalEmojireact`)
                .setTitle('Definir um Emoji para reação');

                const emojiInput = new TextInputBuilder()
                .setCustomId('emojiparaReagir')
                .setLabel('Emoji')
                .setPlaceholder('Insira um Emoji válido')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

                modal.addComponents(new ActionRowBuilder().addComponents(emojiInput))
                await interaction.showModal(modal);
            }
            if(customId === "msgSuggestion"){

                const modal = new ModalBuilder()
                .setCustomId(`modalMSNGsuggestion`)
                .setTitle('Mensagem enviada na thread');

                const msgInput = new TextInputBuilder()
                .setCustomId('msgThreadsuggestion')
                .setLabel('Mensagem')
                .setPlaceholder('Insira sua mensagem aqui')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

                modal.addComponents(new ActionRowBuilder().addComponents(msgInput))
                await interaction.showModal(modal);
            }
            if(customId === "mudarCor"){

                const modal = new ModalBuilder()
                .setCustomId(`ModalmudarCor`)
                .setTitle('Mensagem enviada na thread');

                const msgInput = new TextInputBuilder()
                .setCustomId('mudarCorinput')
                .setLabel('Cor Principal')
                .setPlaceholder('Insira um código HEX, ex:#ffffff')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

                modal.addComponents(new ActionRowBuilder().addComponents(msgInput))
                await interaction.showModal(modal);
            }
        }

        if(modais){
            if (customId === 'ModalmudarCor') {
                const mainColouur = interaction.fields.getTextInputValue('mudarCorinput');

                const hexColorRegex = /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
                if (!hexColorRegex.test(mainColouur)) {

                    return interaction.reply({ content: `Código Hex Color \`${mainColouur}\` está inválido, Pegue um código HEX válido [neste site.](https://www.google.com/search?q=color+picker&oq=color+picker) `, ephemeral: true });
                } else {
                    General.set(`oficecolor`, mainColouur)
                }

                await config(client, interaction);
            }
            if(customId === "modalEmojireact"){
                let emoji = interaction.fields.getTextInputValue('emojiparaReagir');

                if (emoji !== '') {
                    const emojiRegex = /^<:.+:\d+>$|^<a:.+:\d+>$|^\p{Emoji}$/u;
                    if (!emojiRegex.test(emoji)) {
                        return interaction.reply({ content: `Você inseriu um emoji inválido!`, ephemeral: true });
                    } else {
                        General.set(`reagirEMoji`, emoji);
                        await react(client, interaction);
                    }
                }
            }
            if(customId === "modalEmojisuggestion"){
                let emoji = interaction.fields.getTextInputValue('emojiparaReagirsuggestions');

                if (emoji !== '') {
                    const emojiRegex = /^<:.+:\d+>$|^<a:.+:\d+>$|^\p{Emoji}$/u;
                    if (!emojiRegex.test(emoji)) {
                        return interaction.reply({ content: `Você inseriu um emoji inválido!`, ephemeral: true });
                    } else {
                        General.set(`suggestionEEmoji`, emoji);
                        await sugestao(client, interaction);
                    }
                }
            }
            if(customId === "modalMSNGsuggestion"){
                let msg = interaction.fields.getTextInputValue('msgThreadsuggestion');

                if(msg !== ''){
                    General.set(`suggestionMSNG`, msg);
                    interaction.reply({content:`Mensagem definida com sucesso!`, ephemeral:true})
                } else {
                    return;
                }

            }
        }

        if(channelSelect){
            if(customId == "channelSugestaoSelect"){
                const option = interaction.values[0];
                General.set("suggestionChannel", option);
                sugestao(client, interaction);
            }
            if(customId == "channelReactSelect"){
                const option = interaction.values[0];
                General.set("reagirCAnal", option);
                react(client, interaction);
            }
        }

    }
}