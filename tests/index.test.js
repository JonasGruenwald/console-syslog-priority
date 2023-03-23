const path = require('path');
const {spawn} = require('child_process');
const lib = require("../index")

it('Prepends priority levels to existing console functions vis stdout', done => {
  const exampleAppPath = path.join(
    __dirname,
    './overridesExample.js',
  )
  const testApp = spawn('node', [exampleAppPath])
  let stdOutLog = ""
  testApp.stdout.on('data', data => {
    stdOutLog += data.toString()
  })
  testApp.stdout.on("close", () => {
    const lines = stdOutLog.split('\n')
    expect(lines[0]).toEqual('<6>Logging using console.log() function')
    expect(lines[1]).toEqual('<6>Logging using console.info() function')
    expect(lines[2]).toEqual('<7>Logging using console.debug() function')
    testApp.kill()
    done()
  })
})

it('Prepends priority levels to existing console functions vis stderr', done => {
  const exampleAppPath = path.join(
    __dirname,
    './overridesExample.js',
  )
  const testApp = spawn('node', [exampleAppPath])
  let stdErrLog = ""
  testApp.stderr.on('data', data => {
    stdErrLog += data.toString()
  })
  testApp.stderr.on("close", () => {
    const lines = stdErrLog.split('\n')
    expect(lines[0]).toEqual('<5>Logging using console.warn() function')
    expect(lines[1]).toEqual('<3>Logging using console.error() function')
    testApp.kill()
    done()
  })
})

