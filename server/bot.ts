import { Client, Events, GatewayIntentBits, Message, TextChannel } from 'discord.js';
import { storage } from './storage';
import { analyzeMessage } from './utils/messageParser';
import { detectCode } from './utils/codeDetector';
import { detectProgrammingLanguage } from './utils/languageDetector';
import { generateExplanation, generateCodeCorrection } from './services/openai';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Handle bot errors
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

// Bot initialization
export async function initializeDiscordBot() {
  if (!process.env.DISCORD_TOKEN) {
    console.error('Missing Discord token in environment variables');
    return;
  }

  try {
    // Event: Bot is ready
    client.once(Events.ClientReady, (readyClient) => {
      console.log(`Discord bot logged in as ${readyClient.user.tag}`);
    });

    // Event: Bot receives a message
    client.on(Events.MessageCreate, async (message: Message) => {
      // Ignore bot messages
      if (message.author.bot) return;
      
      // Only respond in the "helperbot-chat" channel
      if (message.channel.isTextBased() && 
          message.channel instanceof TextChannel && 
          message.channel.name !== 'helperbot-chat') {
        return;
      }

      // Get server settings or use defaults
      const serverId = message.guild?.id;
      let serverSettings = serverId 
        ? await storage.getServerSettings(serverId) 
        : undefined;

      const prefix = serverSettings?.prefix || '!';
      const autoRespond = serverSettings?.autoRespond ?? true;

      // Handle commands
      if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        switch (command) {
          case 'help':
            message.reply({
              embeds: [{
                title: 'SourceHelperBot Help',
                description: 'I can automatically detect programming questions and provide help.',
                color: 0x5865F2,
                fields: [
                  { name: `${prefix}help`, value: 'Display this help message' },
                  { name: `${prefix}explain [concept]`, value: 'Explain a programming concept' },
                  { name: `${prefix}fix`, value: 'Fix code in your message (include code in \\`\\`\\` blocks)' },
                  { name: `${prefix}settings`, value: 'Show current server settings' },
                  { name: `${prefix}toggle`, value: 'Toggle automatic responses on/off' }
                ]
              }]
            });
            break;
          
          case 'explain':
            const concept = args.join(' ');
            if (!concept) {
              message.reply('Please specify a concept to explain. Example: `!explain javascript closures`');
              return;
            }
            
            try {
              message.channel.sendTyping();
              const explanation = await generateExplanation(concept);
              await message.reply({ content: explanation });
              await storage.incrementStats('conceptsExplained');
            } catch (error) {
              console.error('Error generating explanation:', error);
              message.reply('Sorry, I encountered an error while generating an explanation.');
            }
            break;
          
          case 'fix':
            const codeBlocks = detectCode(message.content);
            if (codeBlocks.length === 0) {
              message.reply('Please include code in your message using \\`\\`\\` blocks.');
              return;
            }
            
            try {
              message.channel.sendTyping();
              
              const code = codeBlocks[0].code;
              const language = codeBlocks[0].language || detectProgrammingLanguage(code);
              
              const correction = await generateCodeCorrection(code, language);
              await message.reply({ content: correction });
              await storage.incrementStats('codeFixed');
            } catch (error) {
              console.error('Error correcting code:', error);
              message.reply('Sorry, I encountered an error while correcting the code.');
            }
            break;
          
          case 'settings':
            if (!serverId) {
              message.reply('This command can only be used in a server.');
              return;
            }
            
            message.reply({
              embeds: [{
                title: 'Server Settings',
                color: 0x5865F2,
                fields: [
                  { name: 'Prefix', value: serverSettings?.prefix || '!' },
                  { name: 'Auto Respond', value: (serverSettings?.autoRespond ?? true) ? 'On' : 'Off' },
                  { name: 'Language', value: serverSettings?.language || 'en' }
                ]
              }]
            });
            break;
          
          case 'toggle':
            if (!serverId) {
              message.reply('This command can only be used in a server.');
              return;
            }
            
            const newAutoRespond = !(serverSettings?.autoRespond ?? true);
            
            if (serverSettings) {
              serverSettings = await storage.updateServerSettings(serverId, { autoRespond: newAutoRespond });
            } else {
              serverSettings = await storage.createServerSettings({
                serverId,
                autoRespond: newAutoRespond,
                prefix: '!',
                language: 'en'
              });
            }
            
            message.reply(`Automatic responses are now ${newAutoRespond ? 'on' : 'off'}.`);
            break;
        }
        
        return;
      }

      // Only process if auto-respond is enabled
      if (autoRespond) {
        const analysisResult = analyzeMessage(message.content);
        
        if (analysisResult.isProgrammingQuestion) {
          try {
            const codeBlocks = detectCode(message.content);
            
            if (codeBlocks.length > 0) {
              // Handle code correction
              message.channel.sendTyping();
              
              const code = codeBlocks[0].code;
              const language = codeBlocks[0].language || detectProgrammingLanguage(code);
              
              const correction = await generateCodeCorrection(code, language);
              await message.reply({ content: correction });
              await storage.incrementStats('codeFixed');
            } else {
              // Handle concept explanation
              message.channel.sendTyping();
              
              const concept = analysisResult.concept || message.content;
              const explanation = await generateExplanation(concept);
              await message.reply({ content: explanation });
              await storage.incrementStats('questionsAnswered');
            }
          } catch (error) {
            console.error('Error processing message:', error);
            // Don't reply to avoid spamming on errors
          }
        }
      }
    });

    // Login to Discord with token
    await client.login(process.env.DISCORD_TOKEN);
    return client;
  } catch (error) {
    console.error('Failed to initialize Discord bot:', error);
    throw error;
  }
}
