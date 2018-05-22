import socketCluster from 'socketcluster-client'

var options = {
  hostname: 'socket.coinaly.io',
  secure: true,
  port: 443,
  rejectUnauthorized: false, // Only necessary during debug if using a self-signed certificate
  connectTimeout: 5000, // milliseconds
  ackTimeout: 5000, // milliseconds
  autoReconnectOptions: {
    initialDelay: 5000, // milliseconds
    randomness: 5000, // milliseconds
    multiplier: 1.5, // decimal
    maxDelay: 3000 // milliseconds
  }
}

export function websocketConnect () {
  return socketCluster.create(options)
}

export function subscribe (socket, channel) {
  return socket.subscribe(channel)
}

export function unsubscribe (socket, channel) {
  return socket.unsubscribe(channel)
}

export function watch (socket, channel) {
  return socket.watch(channel)
}

export function disconnect (socket, channel) {
  return socket.disconnect(channel)
}
