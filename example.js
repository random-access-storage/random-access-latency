const ral = require('random-access-latency')
const ram = require('random-access-memory')

// use ral to wrap another storage instance and add latency

const storage = ral([50, 100], ram()) // add between 50 and 100ms latency to each operation

// should have latency
storage.write(42, Buffer.from('hi'), function () {
  storage.read(42, 2, console.log)
})
