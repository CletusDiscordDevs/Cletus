module.exports = (token, prefix) => {
  // eslint-disable-next-line no-new
  new (require('./Structures/Entities/Discord/Client'))(token, prefix);
};
