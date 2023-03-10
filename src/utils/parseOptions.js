const parseOptions = (options) => {
  let stickerName = null;
  let stickerAuthor = null;

  options.forEach((option) => {
    if (option.startsWith('name=')) {
      stickerName = option.split('=')[1].replaceAll('"', '');
    } else if (option.startsWith('author=')) {
      stickerAuthor = option.split('=')[1].replaceAll('"', '');
    }
  });

  return { stickerName, stickerAuthor };
};

module.exports = parseOptions;