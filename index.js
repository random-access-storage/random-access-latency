const ras = require('random-access-storage')

module.exports = function (latency, other) {
  if (!Array.isArray(latency)) latency = [latency, latency]

  const delta = latency[1] - latency[0]

  return ras({
    read: run(0),
    write: run(1),
    del: run(2),
    stat: run(3)
  })

  function run (type) {
    return function (req) {
      const timeout = Math.round(Math.random() * delta + latency[0])
      setTimeout(() => fwd(type, req), timeout)
    }
  }

  function fwd (type, req) {
    const cb = req.callback.bind(req)

    switch (type) {
      case 0: return other.read(req.offset, req.size, cb)
      case 1: return other.write(req.offset, req.data, cb)
      case 2: return other.del(req.offset, req.size, cb)
      case 3: return other.stat(cb)
    }
  }
}
