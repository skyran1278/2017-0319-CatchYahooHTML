var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

request({
	url: 'https://tw.stock.yahoo.com/d/s/major_1101.html',
	encoding: null
	}, 
	function (error, response, body) {		
		
		if (error) {
			console.log('error:', error); // Print the error if one occurred 
			return;
		}
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		
		body = iconv.decode(body, 'big5');

		$ = cheerio.load(body);
	  		  	
	  	var items = $('tr[bgcolor="#FFFFFF"] > td.ttt');
	  	// console.log(items);
	  	var results = [];
	  	for (var i = 0; i < items.length; i = i + 4 ) {
	  		results.push({ 
	  			買超券商: $(items[i]).text().trim(), 
	  			買進: Number($(items[i+1]).text().trim()),
	  			賣出: Number($(items[i+2]).text().trim()),
	  			買超: Number($(items[i+3]).text().trim())
	  		});	  		 		
	  	}
	  	console.log(results);
	  	fs.writeFileSync('result.json', JSON.stringify(results));
});