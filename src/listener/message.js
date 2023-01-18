const { Message } = require('whatsapp-web.js');
const { Ai } = require('../commands/ai');

const helpHandler = require('../commands/help');
const stickerHandler = require('../commands/sticker');
const goErrorHandler = require('../utils/goErrHandler');
const parseOptions = require('../utils/parseOptions');
const { PREFIX } = require('../config/config')

const messageListener = async (message) => {
  // get contact info
  const { data: contact, error } = await goErrorHandler(() =>
    message.getContact()
  );
  if (!contact) {
    message.reply('Terjadi kesalahan pada saat mendapatkan info kontak');
    return console.error('Error when getting contact.', error);
  }

  // stop the listener if message is from a status or from a group
  if (message.isStatus || contact.isGroup) return;

  // parse command and options
  const [command, ...rest] = message.body.split(' ').map((cmd) => cmd.trim());
  const options = rest
    .join(' ')
    .replaceAll(' name', '|name')
    .replaceAll(' author', '|author')
    .split('|');
  const { stickerName, stickerAuthor } = parseOptions(options);

  // handle help
  if (command.toLowerCase().includes(`${PREFIX}help`)) {
    return helpHandler(message);
  }

  // handle sticker
  if ([`${PREFIX}sticker`, `${PREFIX}stiker`, `${PREFIX}s`].includes(command) && message.type === 'image') {
    await stickerHandler({
      message,
      phoneNumber: contact.id.user,
      stickerName,
      stickerAuthor,
    });

    return;
  } else if (command.toLowerCase().includes('sticker')) {
    return message.reply('Gambarnya mana?');
  }

};

module.exports = {
    messageListener
}