
Object.keys(localStorage).forEach(function(d) {
    console.log(d)
    $('ul').append('<li></li>')
        .text(d)
})
