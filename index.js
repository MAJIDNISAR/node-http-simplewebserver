const http = require('http')
const fs = require('fs')
const path = require('path')
const hostName = 'localhost'
const port = 3000;
const server = http.createServer((req, res) => {
  //console.log(`request Headers: ${req.headers}`)
  // console.log("==============showing request headers=====================")
  // console.log(req.headers)
  // console.log("==============finish request headers=====================")
  // console.log("==============showing request =====================")
  // console.log(req)
  // console.log("==============finsih request =====================")
  console.log(`Request for : ${req.url} by Method ${req.method}`)
  if (req.method == 'GET') {
    let fileURL
    if (req.url == '/') fileURL = '/index.html'
    else fileURL = req.url
    let filePath = path.resolve('./public/' + fileURL)
    const fileExt = path.extname(filePath)
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html')
          res.end(`<html><body><h1> Error:404 </h1><p>${fileURL} Not Found</p></body></html>`)
          console.log(`Request for : ${req.url} by Method ${req.method} response = ${res.statusCode}`)
          return
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          fs.createReadStream(filePath).pipe(res)
          console.log(`Request for : ${req.url} by Method ${req.method} response = ${res.statusCode}`)
        }
      })
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end(`<html><body><h1> Error:404 </h1><p>${fileURL} Not an HTML File </p></body></html>`)
      console.log(`Request for : ${req.url} by Method ${req.method} response = ${res.statusCode}`)
      return
    }
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(`<html><body><h1> Error:404 </h1><p>${req.method} Not supported</p></body></html>`)
    console.log(`Request for : ${req.url} by Method ${req.method} response = ${res.statusCode}`)
    return
  }

  // //console.log(`Remote IP Address:`)
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // //res.write('Hello World')
  // res.end('<html><body><h1>Hello, World</h1></body></html>')
})
server.listen(port, hostName, () => {
  console.log(`Server Started and listening at http://${hostName}:${port}`)
})