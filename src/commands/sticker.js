const goErrorHandler = require('../utils/goErrHandler');

const stickerHandler = async ({
  message,
  phoneNumber,
  stickerName,
  stickerAuthor,
}) => {
  // prevent empty value
  if (!stickerName) stickerName = null;
  if (!stickerAuthor) stickerAuthor = null;

  // download media
  const { data: media, error: downloadError } = await goErrorHandler(() =>
    message.downloadMedia()
  );
  if (!media) {
    message.reply('Terjadi kesalahan pada saat mendownload gambar');
    return console.error('Error when downloading media.', downloadError);
  }

  // send sticker
  const { error: replyError } = await goErrorHandler(() =>
    message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerName: stickerName ?? 'Bot sticker',
      stickerAuthor: stickerAuthor ?? 'GakTau#1598',
    })
  );
  if (replyError instanceof Error) {
    message.reply('Terjadi kesalahan pada saat mengirim stiker');
    return console.error('Error when sending sticker.', replyError);
  }
}
module.exports = stickerHandler
