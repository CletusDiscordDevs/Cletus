async function getResponse(message, filter, options){
  
  let collector = message.channel.createMessageCollector(filter, options);
  let responses = [];
  collector.on('end', (coll) => {
    responses.push(coll);
  });
  
  const wait = (condition) => {
    const result = resolve => {
      if (condition()) resolve();
      else setTimeout(() => { result(resolve) }, 200);
    }

    return new Promise(result);
  }
  
  await wait(() => responses.length != 0);
  return responses[0];
  
}

module.exports = getResponse;

// function wait(condition) {
//   const result = resolve => {
//       if (condition()) resolve();
//       else setTimeout(() => { result(resolve) }, 200);
//   }

//   return new Promise(result);
// }

// async function response(message, filter, options){
  
//   let collector = message.channel.createMessageCollector(filter, options);
//   let responses = [];
//   collector.on('end', (coll) => {
//     responses.push(coll);
//   });
//   await wait(() => responses.length != 0);
//   return responses[0];
  
// }