const {Client , GatewayIntentBits,Collection, Partials } = require("discord.js");
console.clear()

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.MessageContent,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.GuildMembers,

        GatewayIntentBits.GuildPresences,

        GatewayIntentBits.GuildMessageReactions,

        GatewayIntentBits.GuildMessageTyping,

        GatewayIntentBits.DirectMessages,

        GatewayIntentBits.DirectMessageReactions,

        GatewayIntentBits.DirectMessageTyping
    ],

    partials: [

        Partials.Message,
        
        Partials.Channel
    ]

  });

module.exports = client;

client.slashCommands = new Collection();

const {token} = require("./token.json");

client.login(token);

const evento = require("./handler/Events");

evento.run(client);

require("./handler/index")(client);

const axios = require("axios")
const url = 'https://discord.com/api/v10/applications/@me';


const data = {
  description: "<:init:1265111276237881454> **Vexy Type**\n<:Vapps3:1265528443462877204> **Aplicações para o Discord**\n<:Vapps1:1265528440543645736> **https://discord.gg/PMTdVzn9**",
};

axios.patch(url, data, {
  headers: {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json'
  }
})

process.on('unhandRejection', (reason, promise) => {

    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)

  });

  process.on('uncaughtException', (error, origin) => {

    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
    
  });