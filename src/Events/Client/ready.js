const generateProxies = require('../../Structures/Functions/Process/getProxies');

module.exports = async (client) => {
  await generateProxies();
  console.log(`${client.user.username} is online!`);
};
