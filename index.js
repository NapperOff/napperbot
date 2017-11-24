        //-------------------------------------------- PREPARATION --------------------------------------------\\

const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json')
const db = low(adapter)
const Google = require('./commands/google')

db.defaults({ xp: []}).write()

var bot = new Discord.Client();
var servers = {};
var prefix = ("&");


bot.on('ready', () =>{
    bot.user.setPresence({ game: { name: '[&help] En dev', type: 0}});
    console.log("Bot en ligne !");
});

bot.login('Mzc4ODA0NDA0OTMwNzQwMjM1.DPQlIw.51jKQB7SdOHatqH2Q9-nsld46LM');

        //----------------------------------------- COMMANDE PING  -----------------------------------------\\

bot.on('message', message => {

    if (message.content === prefix + "ping"){
        message.channel.send("Pong :ping_pong: ! Mon ping est actuellement de " + bot.ping + " ms !");
        console.log(bot.ping + "ms");
    }

        //------------------------------------- COMMANDE HELP -------------------------------------\\
    
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#0061FF')
            .setTitle("Voici mes commandes.")
            // .addField("Commande du bot !", "&play : Faîtes &play + URL Youtube en étant dans un channel audio. (Actuellement indisponible)")
            .addField("Utilisateur", "`&ping` : Le bot répond son ping (ms). \n`&say` : Le bot répond ce que vous avez dit après &say. \n`&google` : Utile quand on veut faire une recherche rapide et simple.")
            .addField("Administrateur", "`&kick` : Permet de kick un joueur. \n`&ban` : Permet de ban un joueur.")            
            .setFooter(`https://bit.ly/napperbot`)
            message.channel.send("Aide envoyée en MP!");            
            message.author.send({embed: help_embed})
            console.log("Commande help demandée.");
    }

        //------------------------------------- COMMANDE SAY -------------------------------------\\

        if (!message.content.startsWith(prefix)) return;
        var args = message.content.substring(prefix.length).split(" ");
    
        switch (args[0].toLowerCase()){
    
            case "say" :
            content = message.content.substr(5);
            
            message.channel.send(`${content}`)
            break;
            console.log("Say effectué" `${content}`);
        }
        
        //------------------------------------ COMMANDE KICK / BAN ------------------------------------\\
        
        switch (args[0].toLowerCase()){
            case "kick":
            
            if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
                message.reply("Tu n'as pas le droit de kick !")
            }else{
                var memberkick = message.mentions.users.first();
                console.log(memberkick)
                console.log(message.guild.member(memberkick).kickable)
                if(!memberkick){
                    message.reply("L'utilisateur n'éxiste pas.");
                }else{
                    if(!message.guild.member(memberkick).kickable){
                        message.reply("Utilisateur impossible à kick.");
                    }else{
                        message.guild.member(memberkick).kick().then((member) => {
                        message.channel.send(`${member.displayName} à été kick ! Il fut averti.`);
                    }).catch(() => {
                        message.channel.send("Kick refusé.")
                    })
                }
            }
            }
            break;

            case "ban":
            if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
                message.reply("Tu n'as pas le droit de ban !")
            }else{
                var memberban = message.mentions.users.first();
                console.log(memberban)
                console.log(message.guild.member(memberban).bannable)
                if(!memberban){
                    message.reply("L'utilisateur n'éxiste pas.");
                }else{
                    if(!message.guild.member(memberban).bannable){
                        message.reply("Utilisateur impossible à ban.");
                    }else{
                        message.guild.member(memberban).ban().then((member) => {
                        message.channel.send(`${member.displayName} à été banni ! Il fut averti/kick à plusieurs reprises..`);
                    }).catch(() => {
                        message.channel.send("Ban refusé.")
                    })
                }
            }
            }
            break;

    }

        //------------------------------------- WELCOME -------------------------------------\\


        //------------------------------------- AUTRES -------------------------------------\\

        bot.on('message', message => {
            let commandUsed =
            Google.parse(message)
        })
});