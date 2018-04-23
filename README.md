# random-access-latency

A [random-access-storage](https://github.com/random-access-storage/random-access-storage) instance that wraps another one and adds latency

```sh
npm install random-access-latency
```

## Usage

```js
const ral = require('random-access-latency')
const ram = require('random-access-memory')

// use ral to wrap another storage instance and add latency

// add between 50 and 100ms latency to each operation
const storage = ral([50, 100], ram())

// should have latency
storage.write(42, Buffer.from('hi'), function () {
  storage.read(42, 2, console.log)
})
```

## API

#### `storage = ral(latency, otherStorage)`

Wrap another store in random-access-storage instance that adds latency to all operations.
If `latency` is an array a random latency is picked between the first and second number in the array.

## License

MIT
