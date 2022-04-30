const fs = require ('fs')
const db = require("./database.js")
const morgan = require('morgan')


args["port"]
var port = args.port || 5555

//help
if (args.help || args.h) {
    console.log(`
    server.js [options]
    --port, -p	Set the port number for the server to listen on. Must be an integer between 1 and 65535.
    --debug, -d If set to true, creates endlpoints /app/log/access/ which returns a JSON access log from 
                the database and /app/error which throws  an error with the message "Error test successful." 
                Defaults to false.
    --log       If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
    --help, -h	Return this message and exit.
    `)
    process.exit(0)
}
const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%',port))
})

// Require Express.js
const express = require('express')
const app = express()
var min = require("minimist")(process.argv.slice(2))
const HTTP_PORT = min.port||process.env.PORT||5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

//standard flip
app.get('/app/flip/', (req, res) => {
    res.status(200).json({"flip" : coinFlip()})
});

//guess flip
app.get('/app/flip/call/tails', (req, res) => {
    const ter = flipACoin("tails")
    res.status(200).json(ter)
});

//heads version
app.get('/app/flip/call/heads', (req, res) => {
    const val = flipACoin("heads")
    res.status(200).json(val)
});

//number of flips
app.get('/app/flips/:number', (req, res) => {
    const array = coinFlips(req.params.number)
    res.status(200).json({ 'raw' : array, 'summary' : countFlips(array) })
    });

//FUNCTIONS 

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
  let result = Math.random();
  if (result <=.5)
    return "tails"
  return "heads"
}

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
      'heads', 'heads',
      'heads', 'tails',
      'heads', 'tails',
      'tails', 'heads',
      'tails', 'heads'
    ]
 */

function coinFlips(flips) {
  let ret = []; 
  let i = 0; 
  for (let i=0; i < flips; i++) {
    ret.push(coinFlip());
  }
  return ret;
}

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

function countFlips(array) {
  var hCount = 0;
  var tCount = 0;
  array.forEach(element => {
    if (element == "heads")
      hCount++;
    else 
      tCount++;});
  let dict = new Object()
  dict["heads"] = hCount
  dict["tails"] = tCount

  return dict
}

/** Flip a coin!
 * 
 * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
 * 
 * @param {string} call 
 * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
 * 
 * example: flipACoin('tails')
 * returns: { call: 'tails', flip: 'heads', result: 'lose' }
 */

function flipACoin(call) {
  let dict = new Object()
  dict["call"] = call
  let flip = coinFlip()
  dict["flip"] = flip
  if (flip == call)
    dict["result"] = "win"
  else
    dict["result"] = "lose"
  return dict
}
/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
  let result = Math.random();
  if (result <=.5)
    return "tails"
  return "heads"
}

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
      'heads', 'heads',
      'heads', 'tails',
      'heads', 'tails',
      'tails', 'heads',
      'tails', 'heads'
    ]
 */

function coinFlips(flips) {
  let ret = []; 
  let i = 0; 
  for (let i=0; i < flips; i++) {
    ret.push(coinFlip());
  }
  return ret;
}

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

function countFlips(array) {
  var hCount = 0;
  var tCount = 0;
  array.forEach(element => {
    if (element == "heads")
      hCount++;
    else 
      tCount++;});
  let dict = new Object()
  dict["heads"] = hCount
  dict["tails"] = tCount

  return dict
}



// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

if (args.log == true) {
  const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
  app.use(morgan('combined', { stream: accessLog }))
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use( (req, res, next) => {
  let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
  }
  const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?,?,?,?,?,?,?,?,?,?)')
  const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
  next()
})

if (args.debug || args.d) {

  app.get('/app/log/access', (req, res) => {
      const stmt = db.prepare('SELECT * FROM accesslog').all()
      res.status(200).json(stmt)
  })

  app.get('/app/error', (app, res) => {
      throw new Error('BROKEN')
  })
}

app.get('/app/', (req, res) => {
  // Respond with status 200
      res.statusCode = 200;
  // Respond with status message "OK"
      res.statusMessage = 'OK';
      res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
      res.end(res.statusCode+ ' ' +res.statusMessage)
  });

app.get('/app/flip', (req, res) => {
  var flip = coinFlip()
  res.status(200).json({ 'flip' : flip})
})

app.get('/app/flips/:number', (req, res) => {
  
  var results = coinFlips(req.params.number)
  var count = countFlips(results)
  res.status(200).json({ 'raw' : results, "summary": count})
})

app.get('/app/flip/call/heads', (req, res) => {
  res.status(200).json(flipACoin("heads"))
  });

app.get('/app/flip/call/tails', (req, res) => {
  res.status(200).json(flipACoin("tails"))
  });

app.use(function(req, res) {
  res.status(404).send("404 NOT FOUND")
  res.type("text/plain")
})