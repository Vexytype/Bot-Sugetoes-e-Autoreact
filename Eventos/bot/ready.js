const {} = require("discord.js");
const colors = require('colors');

module.exports = {
    name:"ready",
    run:async(client) => {

        console.clear();
        console.log(`${colors.green("[STATUS]")} ${client.user.username} acabou de iniciar.`);
        console.log(` `);
        console.log(`${colors.grey("[OWNER]")} @dabSlan`);
    }
}