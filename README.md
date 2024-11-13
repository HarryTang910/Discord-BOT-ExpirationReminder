# Discord Reminder Bot 🤖
A simple and elegant Discord bot that helps server members set reminders with role mentions.

# Features ✨
- Easy to Use: Simple command structure with embedded messages
- Flexible Time Format: Support for multiple time units
- Role Mentions: Ability to mention specific roles in reminders
- Beautiful Embeds: Colorful and well-formatted messages

# Commands 📝
### Help Command
`!remind` \
Shows all available commands and formats with a beautiful embed message.
### Set Reminder
`!remind set <time> <message> [@role]`\
Sets a new reminder with an optional role mention.
### Time Format
- `s` - Seconds (e.g., 30s)
- `m` - Minutes (e.g., 15m)
- `h` - Hours (e.g., 2h)
- `d` - Days (e.g., 1d)
- `y` - Years (e.g., 1y)

### Examples
- `!remind set 1h Team meeting @Staff`
- `!remind set 30m Break time @everyone`
- `!remind set 2d Project deadline @Developers`

### Message Colors 🎨
The bot uses different colors for different types of messages:
- 🔵 #5865F2 (Discord Blurple) - Help messages
- 🟢 #00FF00 (Green) - Reminder notifications
- 🔷 #0099FF (Blue) - Confirmation messages
- 🔴 #FF0000 (Red) - Error messages

### Setup 🛠️
1. Clone this repository
2. Install dependencies: 
```bash
npm install discord.js
```
3. Create a `.env` file:
```json
TOKEN = your-bot-token-here
```
4. Start the bot: 
```bash
node index.js
```

### Required Permissions 🔑
The bot needs the following permissions:
- Read Messages/View Channels
- Send Messages
- Embed Links
- Mention @everyone, @here, and All Roles
- Read Message History

### Dependencies 📦
- discord.js: ^14.0.0
- Node.js: >=16.x

### File Structure 📁
```
├── index.js          # Main bot code
├── config.json       # Bot configuration
├── package.json      # Project dependencies
└── README.md         # Documentation
```

### Error Handling ⚠️
The bot provides clear error messages for:
- Invalid time formats
- Invalid command syntax
- Missing permissions
- Failed reminder deliveries

### Contributing 🤝
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

### Author ✍️
Created with ❤️ by HarryTang

### License 📄
This project is licensed under the MIT License.

### Support 💖
If you find any bugs or have suggestions, please open an issue on GitHub.

### Changelog 📝
- Version 1.0.0
- Initial release
- Basic reminder functionality
- Role mention support
- Embedded messages
- Multiple time formats