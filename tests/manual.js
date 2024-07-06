import why from '../index.js'
import { createServer } from 'node:net'

function startServer () {
  const server = createServer()
  setInterval(() => {}, 1000)
  server.listen(0)
}

startServer()
startServer()

setImmediate(() => why())
