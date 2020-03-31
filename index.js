const express = require('express');
const application = express();
const port = 8080;
const datapath = './userservicedata.json';

const fs = require('fs');

application.get('/user/:id' , (req,res) =>
{
    fs.readFile(datapath ,'utf8' ,(err, data) => {
        if(err)
        throw err;
        res.send(JSON.stringify(JSON.parse(data).data))
    })
}
)
                

application.use(express.static('public'))
application.listen(port, () => console.log(`NAGP-quotes app listening on port ${port}!`))
                            


