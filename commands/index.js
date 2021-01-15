require('dotenv').config()
const Discord = require('discord.js')

const ping = {
  name: 'ping',
  description: 'Ping!',
  execute: message => {
    message.channel.send('Pong')
  }
}

const pong = {
  name: 'pong',
  description: 'Pong!',
  execute: message => {
    message.channel.send('Ping')
  }
}

const echo = {
  name: 'echo',
  execute: (message, args) => {
    message.channel.send(args.join(' '))
  }
}

const embed = {
  name: 'embed',
  execute: message => {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Some title')
      .setURL('https://discord.js.org/')
      .setAuthor('The Hello Bot', process.env.IMAGE_URL)
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true }
      )
      .addField('Inline field title', 'Some value here', true)
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png')
    message.channel.send(embed)
  }
}

module.exports = [ping, pong, echo, embed]
