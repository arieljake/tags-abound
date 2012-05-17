
var Browser = require('zombie');
var assert = require('assert');

var browser = new Browser();

browser.on('error', function (error)
{
	console.error(error);

});

browser.visit("http://localhost:3000/", function (e,browser)
{
	browser.pressButton("Login", function ()
	{
	});

});