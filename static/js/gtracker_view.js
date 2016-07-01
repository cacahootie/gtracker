
var item_template = $('#item_template').text()

Object.keys(localStorage).forEach(function(d) {
    var item = JSON.parse(localStorage[d])
    $('#records').append(nunjucks.renderString(item_template, item))
})
