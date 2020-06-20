const klaw = require('klaw')
const path = require('path')
const fileSync = require('fs-sync')
module.exports = (client) => {

  let events = [];
  klaw('./Events').on('readable', function(){
    let item;
    while(item = this.read()){
      events.push(item.path)
    }
  }).on('end', function(){
    events.forEach(file => {
      if(file.endsWith('.js') == false || fileSync.isDir(file) == true) return;
      let evt = require(file);
      let eName = path.basename(file).replace(".js","");
      client.on(eName, evt.bind(null, client));
      console.log(`${file} is now loaded`)
    })
  })
  
}
