/// @ts-check
// <reference types="node"/>

const path = require('path');
const url = require("url");
const http = require("http");
var static = require('node-static');
const fs = require('fs')
const lookup = require("mime-types").lookup;

global["__filename"] = module.filename;
global["__dirname"] = path.dirname(module.filename);

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    if (!fs.existsSync(url)) {
      reject(`File not found: ${url}`);
    }
    const readStream = fs.createReadStream(url);
    readStream.on('open', function () {
      const Response = require('node-fetch').Response;
      resolve(new Response(readStream, {
        status: 200,
        statusText: 'OK'
      }));
    });
  });
};
global["fetch"] = fetch;

process.chdir(__dirname);

module.require("@flyover/system");

module.require("./system.config.js");

console.log('CODE RUN ON NODE SIDE');

const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  console.log('creating server');
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  /**
   *  /
   *  /index.html
   *
   *  /main.css
   *  /main.js
   */
  if (path == "") {
    path = "index.html";
  }
  console.log(`Requested path ${path} `);

  let file = path === 'index.html' ? __dirname + '\\index.html' : path;
  //async read file function uses callback
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path).toString();
      res.writeHead(200, { "Content-type": mime });
      res.end(content);
    }
  });
});
  
server.listen(8000, "localhost", () => {
  console.log("Listening on port 8000");
});

// var file = new(static.Server)(__dirname);

// http.createServer(function (req, res) {
//   file.serve(req, res);
// }).listen(8000);

console.log('readFile called');

// @ts-ignore
System.import("main")
.then(function (main) { 
  main.default();
})
.catch(console.error);
