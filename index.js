const http = require('http')
const hostName = 'localhost'
const port = 3000;
const server = http.createServer((req, res) => {
  //console.log(`request Headers: ${req.headers}`)
  console.log("==============showing request headers=====================")
  console.log(req.headers)
  console.log("==============finish request headers=====================")
  console.log("==============showing request Body=====================")
  console.log(req)
  console.log("==============finsih request Body=====================")

  //console.log(`Remote IP Address:`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  //res.write('Hello World')
  res.end('<html><body><h1>Hello, World</h1></body></html>')
})
server.listen(port, hostName, () => {
  console.log(`Server Started and listening at http://${hostName}:${port}`)
})