const express = require('express')
const app = express()
const port = 8081
const request = require('request-promise');
const sourceuser = process.env.USER_URL||"http://localhost:8080";
const sourceorder = process.env.ORDER_URL||"http://localhost:8082";

app.get('/orderdetails/:id', async (req, res) => {
	let user  = await request(sourceuser+'/user/'+req.params.id, { json: true });
	let orders  = await request(sourceorder+'/orders/'+req.params.id, { json: true });
	res.json({userDetails:user,orders});

})

app.use(express.static('public'))

app.listen(port, () => console.log(`NAGP-quotes-consumer app listening on port ${port}!`))