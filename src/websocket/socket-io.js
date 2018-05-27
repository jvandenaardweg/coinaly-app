import io from 'socket.io-client'

const socket = io('wss://streamer.cryptocompare.com')

socket.emit('SubAdd',  {
  subs: [
    '2~Binance~BTC~USDT',
    '2~Binance~ETH~USDT',
    '2~Binance~BNB~USDT',
    '2~Binance~LTC~USDT'
  ]
})

socket.on('connect', () => {
  console.log('socketio connect')
})

socket.on('event', (data) => {
  console.log('socketio data', data)
})

socket.on('m', (data) => {
  console.log('socketio m', data)
})

socket.on('disconnect', () => {
  console.log('socketio disconnect')
})

