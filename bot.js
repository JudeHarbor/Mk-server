const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'whitebait.aternos.host',
    port: 15700, // check this in Aternos dashboard
    username: 'TheEmperor123'
  });

bot.once('spawn', () => {
  console.log('Bot successfully spawned and online!');
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 500);
  }, 10000); // walk forward every 10s
});

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 15s...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

setTimeout(createBot, 10000); // wait 10s before first connection
