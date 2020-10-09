// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Client Token (Only stored for this session):\n", function(token) {
//     rl.question("Client prefix (Only stored for this session):\n", function(prefix) {
//         require('./bot.js')(token, prefix);
//     });
// });
require('dotenv').config();

let load = require('./bot');
load(process.env.TOKEN, '=');
