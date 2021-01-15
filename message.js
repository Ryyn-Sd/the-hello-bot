const { prefix } = require('./config.json')
module.exports = (message, client) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    )

  if (!command) return

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("I can't execute that command inside DMs!")
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author)
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can not do this!')
    }
  }

  if (command.args && !args.length) {
    const reply = `You didn't provide any arguments, ${message.author}!${
      command.usage
        ? `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        : ''
    }`
    return message.channel.send(reply)
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
}
