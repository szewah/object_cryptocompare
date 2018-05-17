$.ajax({
  type: 'GET',
  url: 'https://api.coinmarketcap.com/v2/ticker/?limit=10',
  success: coinCapResponse,
})

function coinCapResponse(res) {
	var src = $('#article-template').html()
	var template = Handlebars.compile(src)
	var coinDataArray = []
	Object.keys(res.data).forEach(function(key) {
		coinDataArray.push(res.data[key])
	})
	coinDataArray.sort(function(a,b) {
		return a.rank > b.rank
	})
	console.log(coinDataArray)
	var articlesTemplate  = template(coinDataArray) 
	$("#coinmarket").append(articlesTemplate)
}


var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

Handlebars.registerHelper('formatCurrency', function(currency) {
	return formatter.format(currency)
})

