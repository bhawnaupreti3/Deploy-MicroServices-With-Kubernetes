const express = require('express')
const app = express()
const initTracer = require('./opentracing').initTracer;

const tracer = initTracer('AggregatorService');
const port = 8081
const request = require('request-promise');
const sourceuser = process.env.USER_URL||"http://UserService:8080";
const sourceorder = process.env.ORDER_URL||"http://OrderService:8082";

app.get('/orderdetails/:id', async (req, res) => {
	const span = tracer.startSpan('Aggregator Service');
	let user  = await request(sourceuser+'/user/'+req.params.id, { json: true });
	let orders  = await request(sourceorder+'/orders/'+req.params.id, { json: true });
	span.log({
		event: "User and Order Details fetched",
		value: user,orders,
	})  
	span.finish();
	res.json({userDetails:user,orders});
	
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Aggregator Service listening on port ${port}!`))