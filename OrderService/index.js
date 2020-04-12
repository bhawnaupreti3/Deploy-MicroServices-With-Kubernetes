const express = require('express');
const application = express();
const initTracer = require('./opentracing').initTracer;

const tracer = initTracer('OrderService');
const port = 8082;
const datapath = './orderservicedata.json';

const fs = require('fs');

application.get('/orders/:id' , (req,res) =>
{
    const span = tracer.startSpan('Order Details');
    fs.readFile(datapath ,'utf8' ,(err, data) => {
        if(err)
        throw err;
        span.log({
            event: "Order Details fetched",
            value: data,
        })  
        span.finish();
        res.send(JSON.stringify(JSON.parse(data)))
        
    })
}
)
                

application.use(express.static('public'))
application.listen(port, () => console.log(`NAGP-quotes app listening on port ${port}!`))
                            


