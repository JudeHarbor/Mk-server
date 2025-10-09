const mineflayer = require('mineflayer');
const express = require('express');

// --- tiny express server so Render + UptimeRobot can ping it ---
const app = express();
app.get('/', (req, res) => res.send('Minecraft AFK Bot is running!'));
app.listen(3000, () => console.log('🌍 Web server running on port 3000'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'bassador.aternos.host',
    port: 15700, // check this in Aternos dashboard
    username: 'TheEmperor',
    version: '1.20.1',
    auth: 'offline'
  });

  bot.once('spawn', () => {
    console.log('✅ Bot successfully spawned and online!');

    // Walk forward every 10 seconds
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 500);
    }, 10000);

    // Whisper to itself every 2 minutes (120000 ms)
    setInterval(() => {
      bot.chat('/msg TheEmperor Long live The Emperor!');
      console.log('💬 Whispered to self');
    }, 120000);
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected, reconnecting in 15s...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('⚠️ Error:', err));
}

setTimeout(createBot, 10000); // wait 10s before first connection
