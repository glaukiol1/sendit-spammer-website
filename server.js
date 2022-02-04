
const express = require('express') // Require ExpressJS

const app = express() // Init the app AKA server

const bodyParser = require('body-parser') // Require Body Parser Module
const cookieParser = require('cookie-parser') // Require Cookie Parser Module

app.use(cookieParser()) // Use cookie parser module in our server
app.use(bodyParser.urlencoded({
	extended: true
})); // Use body parser module in our server
app.use(express.json()) // Use JSON in our server
app.set('view engine', 'pug') // Use the pug langauge to default view
app.use(express.static('public')) // Set the public folder to be static in our server


app.get('/', function (req, res) { // Setup GET request on the / route
	res.render('index.pug') // Render the index.pug file to the client
})

app.get('/senditid', async (req, res) => {
	var webdriver = require("selenium-webdriver");

	var browser = new webdriver.Builder().forBrowser('chrome').build();
	await browser.get(req.query.url);

	var promise = browser.getTitle();

	promise.then(function (title) {
		console.log(title);
	});
	browser.executeScript(`
	document.getElementsByTagName('noscript')[0].id = 'data-div-1234'
	globalThis.fetch = (url,init) => {
		document.getElementById('data-div-1234').innerHTML = init.body
		return fetch(url,init)
	}
	`)
	setTimeout(() => {
		browser.findElement(webdriver.By.className('input-textbox')).sendKeys(req.query.question).then( () => {
			browser.findElement(webdriver.By.className('send-button')).click().then(()=>{
				setTimeout( () => {
					browser.executeScript(function() {
						return document.querySelector('#data-div-1234').innerHTML;
					  }).then(function(innerHTML) {
						res.json(JSON.parse(innerHTML)).status(200)
					  });
				}, 1000)
				
			})
		})
		
	}, 1000)
	
})

app.listen(3000, () => { console.log('Server Started on 127.0.0.1:3000!') }) // Listen on port 3000

