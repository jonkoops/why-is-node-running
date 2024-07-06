import test from 'node:test'
import { spawn } from 'node:child_process'
import path from 'node:path'

console.log(path.resolve(import.meta.dirname, 'manual.js'))

test('it captures the correct output', async ({ assert }) => {
  const output = await run(path.resolve(import.meta.dirname, 'manual.js'))

  for (const line of output.stderr) {
    console.log(line)
  }
})

function run(src, killAfter = 200) {
  const process = spawn('node', [src])
  const { promise, resolve } = Promise.withResolvers()
  let stdout = []
  let stderr = []

  process.stdout.on('data', (data) => { stdout.push(data.toString()) })
  process.stderr.on('data', (data) => { stderr.push(data.toString()) })

  process.on('close', (code) => {
    resolve({ code, stdout, stderr })
  })

  setTimeout(() => process.kill(), killAfter)

  return promise
}