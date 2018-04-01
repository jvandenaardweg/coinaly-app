import socketCluster from 'socketcluster-client'

var options = {
  hostname: 'socket.coinaly.io',
  secure: true,
  port: 443,
  rejectUnauthorized: false // Only necessary during debug if using a self-signed certificate
}
// Initiate the connection to the server
var socket = socketCluster.create(options)

socket.on('subscribe', function (channelname) {
  console.log('subscribe:' + channelname)
})

socket.on('subscribeFail', function (channelname) {
  console.log('subscribeFail:' + channelname)
})

socket.on('unsubscribe', function (channelname) {
  console.log('unsubscribe:' + channelname)
})

socket.on('subscribeStateChange', function (data) {
  console.log('subscribeStateChange:' + JSON.stringify(data))
})

socket.on('message', function (data) {
  // console.log('message:' + data)
})

export default socket
