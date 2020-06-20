const klaw = require('klaw-sync');
const path = require('path');

module.exports = (client) => {
  
  let items = klaw('./Handlers', {
    nodir: true,
    nofile: false,
    transverseAll: true,
    filter:function(item){
      return path.basename(item.path).split(".")[1] == "js";
    }
  });
  
  items.forEach((item) => {
    require(item.path)(client);
  });
  
  formatChannelId:function(idText){
        idText  =  idText.slice(2, 20) ;
        return  idText;
    },
}