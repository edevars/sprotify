const routes = require('next-routes')

// .add(nombre, url, archivo.js)      
module.exports = routes()        
  .add('index')
  .add('channel', '/:slug.:id', 'channel')
  .add('clip', '/:slugChannel.:idChannel/:slug.:id', 'clip')      