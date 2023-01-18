const  { Message } = require('whatsapp-web.js');
const { PREFIX } = require('../config/config')

const helpHandler = (message) => {
  message.reply(
    `*Help Menu*
*Bertanya atau chat*
\`\`\`${PREFIX}ask\`\`\`
Kirim gambar dengan deskripsi sebagai berikut:
*Buat stiker biasa*
\`\`\`${PREFIX}sticker | ${PREFIX}stiker | ${PREFIX}s\`\`\`
*Buat stiker dengan custom name*
\`\`\`${PREFIX}sticker name="Nama stiker"\`\`\`
*Buat stiker dengan custom author*
\`\`\`${PREFIX}sticker author="Nama author"\`\`\`
*Buat stiker dengan custom name dan author*
\`\`\`${PREFIX}sticker name="Nama stiker" author="Nama author"\`\`\`
*Support Server*
\`\`\`Discord: https://discord.gg/VTwKusPh3P\`\`\`
\`\`\`Owner: GakTau#1598\`\`\`
`
  );
};

module.exports = helpHandler;