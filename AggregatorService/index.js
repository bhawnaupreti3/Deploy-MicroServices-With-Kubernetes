const express = require('express')
const app = express()
const port = 8081
const request = require('request');
const sourceuser = "http://localhost:8080";
const sourceorder = "http://localhost:8082";

app.get('/orderdetails/:id', (req, res) => {
	request(sourceuser+'/user/'+req.params.id, { json: true }, (err, resp, body) => {
	  if (err || resp.statusCode!=200) {
	  	  res.send("Error while getting data from "+err) 
	  } else{
		  res.send({
		  	"UserDetails":body	  	
		  });
	  }
	  
	}),
	request(sourceorder+'/orders/'+req.params.id, { json: true }, (err, resp, body) => {
		if (err || resp.statusCode!=200) {
			  res.send("Error while getting data from "+err) 
		} else{
			res.send({
				"OrderDetails":body	  	
			});
		}
		
	  });  

})

app.use(express.static('public'))

app.listen(port, () => console.log(`NAGP-quotes-consumer app listening on port ${port}!`))