module.exports = (token, prefix) => {
  // eslint-disable-next-line no-new
  new (require('./Structures/Entities/Discord/Client'))(token, prefix);
};

let client = require('./Structures/Entities/Discord/Client');
let bot = new client();
bot.load