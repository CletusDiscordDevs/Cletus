const generateProxies = require('../../Structures/Functions/Process/getProxies');

module.exports = async (client) => {
  await generateProxies();
  console.log(`${client.user.username} is online!`);
  client.user.setActivity('You smile :)', { type: 'WATCHING' });
};

