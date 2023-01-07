const fs = require('fs');
const http = require('http');
const express = require('express');
const productRouter = require('./routes/products')
const bodyParser = require('body-parser');
const path = require('path');


// fs.writeFileSync('test.txt','hello');
// fs.writeFile('testAsync.txt', 'hello async', () => {
//   console.log('finished')
// })


// const server = http.createServer((request,response) => {
//        console.log("reuqest recieved",request.url)
//        response.write("<h1>Hello</h1>")
//        response.end();
// })

// server.listen(8888);

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')));

app.use('/product',productRouter);

app.use("/test",(request,response) => {
       console.log("/test request")
       response.send("<h2> / test request</h2>")
})


app.use("/",(request,response) => {
       console.log("/ request")
       response.send("<h2> / request</h2>")
})

app.use((error,req,res,next) => {
       console.log(error.message);
       res.send(error.message);
})

app.listen(8888);








