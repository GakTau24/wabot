const { Client, LocalAuth } = require('whatsapp-web.js');
const { qrListener } = require('./listener/qr')
const { readyListener } = require('./listener/ready')
const { messageListener  } = require('./listener/message');
const { Ai } = require('./commands/ai');
const { PREFIX } = require('./config/config')

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qrListener);
client.on('ready', readyListener);
client.on('message', messageListener);
client.on('message', async message => {
    const cmd = message.body.toLowerCase()
    if (cmd.includes(`${PREFIX}ask`)) {
        await Ai(cmd, message)
    }
})

client.initialize();