require('dotenv').config()
const Discord = require('discord.js')
const axios = require('axios')

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

const hi = {
  name: 'hi',
  description: 'Hi!',
  execute: message => {
    message.channel.send('hi')
  }
}

const nooo = {
  name: 'nooo',
  regex: /^n{2,}o+|n+o{2,}$/,
  execute: (message, args, client) => {
    const onMessage = msg => {
      if (message.channel.id === msg.channel.id && !msg.author.bot) {
        msg.reply("That's terrible!")
        client.off('message', onMessage)
      }
    }
    client.on('message', onMessage)
  }
}

const yess = {
  name: 'yess',
  regex: /^y{2,}e+s+|y+e{2,}s+|y+e+s{2,}$/,
  execute: (message, args, client) => {
    const onMessage = msg => {
      if (message.channel.id === msg.channel.id && !msg.author.bot) {
        msg.reply('Congrats!!')
        client.off('message', onMessage)
      }
    }
    client.on('message', onMessage)
  }
}

const prune = {
  permissions: 'MANAGE_MESSAGES',
    name: 'prune',
    description: 'Prune up to 99 messages.',
    execute(message, args) {
      const amount = parseInt(args[0]) + 1;
  
      if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
      } else if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
      }
  
      message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('there was an error trying to prune messages in this channel!');
      });
    },
}

const joke = {
  name: 'joke',
  execute: (message) => {
    axios('https://icanhazdadjoke.com/', {
      responseType: 'text',
      headers: {
        Accept: 'text/plain',
        'User-Agent': 'The Hello Bot (https://github.com/nathanchu/the-hello-bot)'
      }
    }).then(res => message.channel.send(res.data))
  }
}

const cool = {
  name: 'cool',
  description: 'Hi!',
  execute: message => {
    message.channel.send('I\'m cool dude')
  }
}

module.exports = [ping, pong, echo, embed, hi, nooo, yess, prune, joke, cool]
