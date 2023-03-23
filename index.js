const nativeConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug
}

module.exports.enable = () => {
  // Extend existing console methods
  console.log = (...args) => {
    process.stdout.write("<6>")
    nativeConsole.log(...args)
  };
  console.info = (...args) => {
    process.stdout.write("<6>")
    nativeConsole.info(...args)
  };
  console.warn = (...args) => {
    process.stderr.write("<5>")
    nativeConsole.warn(...args)
  };
  console.error = (...args) => {
    process.stderr.write("<3>")
    nativeConsole.error(...args)
  };
  console.debug = (...args) => {
    process.stdout.write("<7>")
    nativeConsole.debug(...args)
  };
}

module.exports.enableDomain = () => {
  const domain = require("node:domain");
  const d = domain.create();
  d.on('error', (error) => {
    nativeConsole.error(`<3>${error.stack}
    
Node.js ${process.version}`)
    d.exit()
    process.exit(1);
  })
  d.enter()
}
