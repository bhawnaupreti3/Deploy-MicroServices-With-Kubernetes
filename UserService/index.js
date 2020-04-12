const express = require('express');
const application = express();
const initTracer = require('./opentracing').initTracer;

const tracer = initTracer('UserService');

const port = 8080;
const datapath = './userservicedata.json';
const fs = require('fs');

application.get('/user/:id' , (req,res) =>
{
    const span = tracer.startSpan("User details");
    fs.readFile(datapath ,'utf8' ,(err, data) => {
        if(err)
        throw err;
        span.log({
            event: "User Details fetched",
            value: data,
        })    
        span.finish();
        res.send(JSON.stringify(JSON.parse(data).data))
        
    })
}
)
                

application.use(express.static('public'))
application.listen(port, () => console.log(`User Service app listening on port ${port}!`))
                            


