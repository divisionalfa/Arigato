const Discord = require('discord.js')
const db = require('quick.db')
const {
    MessageActionRow,
    MessageButton,
    MessageMenuOption,
    MessageMenu
} = require('discord-buttons');

module.exports = {
    name: 'voice',
    aliases: ['vc', 'stats', 'stat'],

    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                const guild = client.guilds.cache.get(args[0]) || message.guild

        if (args[0] === "all") {

            var streamingCount = 0;
            var mutedCount = 0;
            var mutedMic = 0;
            var cameraCount = 0;
            var connectedCount = 0;

            const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
            channels.forEach(c => {
                connectedCount += c.members.size;
                c.members.forEach(m => {
                    if (m.voice.streaming) streamingCount++;
                    if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                    if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                    if (m.voice.selfVideo) cameraCount++;
                })
            })
            const voiceConnectedEmbed = new Discord.MessageEmbed()
                .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                .setURL('https://twitch.com/raci_m')
                //.setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`
- ${message.guild.memberCount > 1 ? '*Membres*' : '*Membre*'} *sur le serveur :* **${message.guild.memberCount}** <:membe:1248945266330173553>
- ${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size > 1 ? '*Membres*' : '*Membre*'} *en ligne :* **${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}** <:offline:1262049548713328760>
- ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Membres*' : '*Membre*'} *en vocal :* **${message.guild.members.cache.filter(m => m.voice.channel).size}** <:vocal:1262048202350264430>
- ${message.guild.premiumSubscriptionCount > 1 ? '*Nombre*' : '*Nombres*'} *de boosts :* **${message.guild.premiumSubscriptionCount}** <a:boost:1248944721225580646>
`)
                .setColor(color)
                .setTimestamp()
                .setFooter(`${message.guild.name} #Statistiques`)

                if (guild.icon) voiceConnectedEmbed.setThumbnail(guild.iconURL({
                    dynamic: true
                }))

            return message.channel.send(voiceConnectedEmbed)
        } else if (!args[1]) {
            let embed = new Discord.MessageEmbed()
                .setTimestamp()
				.setTitle(`__${message.guild.name} ➔ Statistiques Salon Vocaux__`)
				.setURL('https://twitch.com/raci_m')
				.setThumbnail(guild.iconURL({dynamic: true}))
                .setDescription(`- *Il y à actuellement* **${message.guild.members.cache.filter(m => m.voice.channel).size} ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? 'Personnes' : 'Personne'}** *en vocal sur le serveur.* <:vocal:1262048202350264430>`)
                .setColor(color)
                .setFooter(`${message.guild.name} #Statistiques`)

            message.channel.send(embed)

        } else if (!args[0] || args[0] === "info") {
            if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                if (args[1] === "all") {

                    var streamingCount = 0;
                    var mutedCount = 0;
                    var mutedMic = 0;
                    var cameraCount = 0;
                    var connectedCount = 0;

                    const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
                    channels.forEach(c => {
                        connectedCount += c.members.size;
                        c.members.forEach(m => {
                            if (m.voice.streaming) streamingCount++;
                            if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                            if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                            if (m.voice.selfVideo) cameraCount++;
                        })
                    })
                    const voiceConnectedEmbed = new Discord.MessageEmbed()
                        .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                        .setURL('https://twitch.com/raci_m')
                        .setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(` 
- **${message.guild.members.cache.filter(m => m.voice.channel).size}** ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? '*Personnes*' : '*Personne*'} *en vocal.* <:vocal:1262048202350264430>
- **${mutedMic}** ${mutedMic > 1 ? '*Personnes*' : '*Personne*'} *sont mute micro.* <a:mute:1262048408349184031>
- **${mutedCount}** ${mutedCount > 1 ? '*Personnes*' : '*Personne*'} *sont mute casque.* <:mutecasque:1262048551152783513>
- **${streamingCount}** ${streamingCount > 1 ? '*Personnes*' : '*Personne*'} *sont en stream.* <:stream:1262048684065947709>
- **${cameraCount}** ${cameraCount > 1 ? '*Personnes*' : '*Personne*'} *sont en caméra.* <:camera:1262048942162579567>
`)
                        .setColor(color)
                        .setTimestamp()
                        .setFooter(`${message.guild.name} #Statistiques`)

                    return message.channel.send(voiceConnectedEmbed)
                } else if (!args[1]) {
                    let embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setTitle(`__${message.guild.name} ➔ Statistiques__`)
                        .setURL('https://twitch.com/raci_m')
						.setThumbnail(guild.iconURL({dynamic: true}))
                        .setDescription(`- *Il y à actuellement* **${message.guild.members.cache.filter(m => m.voice.channel).size} ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? 'Personnes' : 'Personne'}** *en vocal sur le serveur.* <:vocal:1262048202350264430>`)
                        .setColor(color)
                        .setFooter(`${message.guild.name} #Statistiques`)

                    message.channel.send(embed)
                }
            }
        }
    }
}
    }
