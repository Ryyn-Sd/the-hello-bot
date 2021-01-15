const Discord = require('discord.js')
const { token, plugins } = require('./config.json')
const messageHandler = require('./message')
const commands = require('./commands')

try {
  require('dotenv').config()
} catch (e) {}

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
})
client.commands = new Discord.Collection()

commands.forEach(command => {
  client.commands.set(command.name, command)
})

const tryFetch = async (reaction, user) => {
  if (reaction.partial && user.partial) {
    try {
      await Promise.all([reaction.fetch(), user.fetch()])
    } catch (error) {
      console.error(
        'Something went wrong when fetching the reaction and/or user: ',
        error
      )
    }
  } else if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the reaction: ', error)
    }
  } else if (user.partial) {
    try {
      await user.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the reaction: ', error)
    }
  }
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => messageHandler(message, client))

client.on('messageReactionAdd', async (reaction, user) => {
  await tryFetch(reaction, user)
  if (plugins?.reactionRoles?.[reaction.message.id]?.[reaction.emoji.name]) {
    console.log(
      `Adding user to role ${
        plugins.reactionRoles[reaction.message.id][reaction.emoji.name]
      }`
    )
    reaction.message.guild
      .member(user)
      .roles.add(
        plugins.reactionRoles[reaction.message.id][reaction.emoji.name]
      )
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  await tryFetch(reaction, user)
  if (plugins?.reactionRoles?.[reaction.message.id]?.[reaction.emoji.name]) {
    console.log(
      `Removing user from role ${
        plugins.reactionRoles[reaction.message.id][reaction.emoji.name]
      }`
    )
    reaction.message.guild
      .member(user)
      .roles.remove(
        plugins.reactionRoles[reaction.message.id][reaction.emoji.name]
      )
  }
})

client.login(token || process.env.TOKEN)

process.on('SIGINT', () => {
  console.log('Exiting...')
  client.destroy()
  console.log('Bye Bye!')
  process.exit()
})
