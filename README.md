# Prodless Esports Bot
>Discord bot for Prodless Esports

A Discord bot for Prodless Esports to organize everything

## Installation
1. Clone the repository
```sh
git clone https://github.com/JelaniAlexis/prodess-esports-bot.git
```

2. Install the Node modules using npm
```sh
npm install
```

3. Create a .env file following this template and fill it with the actual details
```
DISCORD_PUBLIC_KEY=
DISCORD_APPLICATION_ID=
DISCORD_CLIENT_SECRET=
DISCORD_TOKEN=
```


## NPM Commands

### start
Starts an instance of the bot. Used by always-on systems such as Discord bot hosts or Raspberry Pis.

***

### serve
Starts an instance of the bot that refreshes whenever a change is made. Used by the developer so he can save time restarting.

***

### deploy-commands
Deploys all commands onto Discord.

**Example 1 - Deploy commands to guild with ID 1234567890123456789**

`npm run deploy-commands -- guild 1234567890123456789`

#### scope
Determines whether to push the command changes locally or globally.

**Options:**
- guild - Push command changes to a guild (server)
- global - Push command changes globally

#### guildId (conditional)
The Discord guild ID for the server (guild) to push command changes to. Can be found by right-clicking on a server, if you're in Developer Mode on Discord. Only used when `scope` is set to `guild`.

***

### delete-command
Deletes a specified command in a certain scope. If no command is specified, deleted all commands instead.

**Example 1 - Delete command with ID 1234567890123456789 from guild with ID 0987654321098765432**

`npm run delete-command -- guild 0987654321098765432 1234567890123456789`

**Example 2 - Delete all commands everywhere**

`npm run delete-command -- global`

#### scope
Determines whether to push the command deletion locally or globally.

**Options:**
- guild - Delete command(s) in a guild (server)
- global - Delete command(s) globally

#### guildId (conditional)
The Discord guild ID for the server (guild) to remove the command(s) from. Can be found by right-clicking on a server, if you're in Developer Mode on Discord. Only used when `scope` is set to `guild`.

#### commandId (optional)
The Discord command ID for the command to remove. Can be copied from the right-click menu if you're in Developer Mode on Discord. Only enter if you wish not to remove all commands in the scope.