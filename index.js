const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'REDACTED';
const ping = require('minecraft-server-util');
const PREFIX = '';

bot.on('message', message =>{
    let userMessage = message.content.substring(PREFIX.length).split(" ");

    if (userMessage[0] == 'mc'){
        switch (userMessage[1]){
            case 'status':
                
                ping('127.0.0.1', 25565, (error, response) =>{
                    if(error){ throw error } 
                    let mcServerEmbed = new Discord.MessageEmbed()
                    .setTitle('Minecraft Server Information')
                    .setColor('DARK_GREEN')
                    .addField('IP:', 'sooloo.monster', true)
                    .addField('Version:', response.version, true)
                    .addField('Players', response.onlinePlayers + '/' + response.maxPlayers, true)
                    .setThumbnail(bot.user.displayAvatarURL)
                    var playersInServer = '\n';
                    if (response.samplePlayers !== null){
                        response.samplePlayers.forEach(function(serverPlayers) {
                            playersInServer += serverPlayers.name + '\n';
                        });
                        mcServerEmbed.addField('Players in the Server:', playersInServer, true);
                    }

                    if (response.samplePlayers == null){
                        mcServerEmbed.addField('Players in the Server:', 'None');
                    }

                    
                    message.channel.send(mcServerEmbed);
                    })

                setInterval(() =>{
                
                    ping('127.0.0.1', 25565, (error, response) =>{
                    if(error){ throw error } 
                    let mcServerEmbed = new Discord.MessageEmbed()
                    .setTitle('Minecraft Server Information')
                    .setColor('DARK_GREEN')
                    .addField('IP:', 'sooloo.monster', true)
                    .addField('Version:', response.version, true)
                    .addField('Players', response.onlinePlayers + '/' + response.maxPlayers, true)
                    .setThumbnail(bot.user.displayAvatarURL)
                    var playersInServer = '\n';
                    if (response.samplePlayers !== null){
                        response.samplePlayers.forEach(function(serverPlayers) {
                            playersInServer += serverPlayers.name + '\n';
                        });
                        mcServerEmbed.addField('Players in the Server:', playersInServer, true);
                    }

                    if (response.samplePlayers == null){
                        mcServerEmbed.addField('Players in the Server:', 'None');
                    }

                    message.channel.bulkDelete(1);
                    message.channel.send(mcServerEmbed);
                
                })
                }, 120000)

                break;

            case 'list':
                message.channel.send();
                break;
        }
    }
})


bot.on ('ready', () =>{
    console.log("Minecraft bot is on!");
})

bot.login(token);