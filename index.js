// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('.env');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Store active reminders
const reminders = new Map();

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content === '!remind') {
        const helpEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('📝 Reminder Bot Help')
            .setDescription("Here's how to use the reminder commands:")
            .addFields(
                {
                    name: '`!remind set <time> <message> [@role]`',
                    value: 'Set a new reminder\nExample: `!remind set 2h Check the oven @Team`',
                },
                {
                    name: '⏰ Time Format',
                    value: '• `s` for seconds (e.g., 30s)\n• `m` for minutes (e.g., 15m)\n• `h` for hours (e.g., 2h)\n• `d` for days (e.g., 1d)\n• `y` for years (e.g., 1y)',
                },
                {
                    name: '👥 Role Mention',
                    value: 'You can mention a role to notify specific groups\nExample: `!remind set 1h Team meeting @Staff`',
                }
            )
            .setFooter({ text: 'Bot created by HarryTang' })
            .setTimestamp();

        return message.reply({ embeds: [helpEmbed] });
    }

    if (message.content.startsWith('!remind set')) {
        const args = message.content.slice(12).trim().split(/ +/);
        if (args.length < 2) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('⚠️ Invalid Format')
                .setDescription(
                    'Please use the format: `!remind set [time] [message] [@role]`\nExample: `!remind set 2h Check something @Team`'
                );

            return message.reply({ embeds: [errorEmbed] });
        }

        const timeArg = args[0].toLowerCase();
        const reminderText = message.content.slice(12 + timeArg.length).trim();

        // Parse time
        const timeValue = parseInt(timeArg);
        const timeUnit = timeArg.slice(timeValue.toString().length);

        let milliseconds;
        switch (timeUnit) {
            case 's':
                milliseconds = timeValue * 1000;
                break;
            case 'm':
                milliseconds = timeValue * 60 * 1000;
                break;
            case 'h':
                milliseconds = timeValue * 60 * 60 * 1000;
                break;
            case 'd':
                milliseconds = timeValue * 24 * 60 * 60 * 1000;
                break;
            case 'y':
                milliseconds = timeValue * 365 * 24 * 60 * 60 * 1000;
                break;
            default:
                const timeUnitErrorEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('⚠️ Invalid Time Unit')
                    .setDescription(
                        'Please use:\n• `s` for seconds\n• `m` for minutes\n• `h` for hours\n• `d` for days\n• `y` for years\n\nExample: `!remind set 30m Check something`'
                    );

                return message.reply({ embeds: [timeUnitErrorEmbed] });
        }

        // Set the reminder
        const reminderId = setTimeout(async () => {
            try {
                const reminderEmbed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('⏰ Reminder!')
                    .setDescription(`**Reminder Message:**\n> ${reminderText}`)
                    .addFields({ name: 'Set by', value: `<@${message.author.id}>` })
                    .setFooter({ text: `Reminder for ${message.author.tag}` })
                    .setTimestamp();

                await message.channel.send({
                    content: reminderText.includes('@') ? reminderText : `<@${message.author.id}>`,
                    embeds: [reminderEmbed],
                    allowedMentions: { parse: ['roles', 'users'] },
                });
                reminders.delete(reminderId);
            } catch (error) {
                console.error('Failed to send reminder:', error);
            }
        }, milliseconds);

        reminders.set(reminderId, {
            userId: message.author.id,
            message: reminderText,
            endTime: Date.now() + milliseconds,
            channelId: message.channel.id, // Store channel ID for reference
        });

        // Convert milliseconds to readable format
        const readableTime = timeArg;

        // Confirmation message
        const confirmEmbed = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle('⏰ Reminder Set!')
            .setDescription(
                `**I'll remind you about:**\n> ${reminderText}\n\n**Time:** ${readableTime}`
            )
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setTimestamp();

        message.reply({ embeds: [confirmEmbed] });
    }
});

// Log in to Discord with your client's token
client.login(token);
