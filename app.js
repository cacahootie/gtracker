var express = require("express")
var morgan = require("morgan")

exports.get_instance = function get_instance() {
    var app = express()
    var router = express.Router()

    router.post('/track', function(req, res) {
        res.end("boffo")
    })
    router.use('/permanentfile', function(req, res) {
        res.end("*satisfying sound of paper crinkling before throwing it away*")
    })
    app.use('/', router)
    app.use('/static',express.static('static'))

    app.use(function(err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })
    app.use(morgan('combined'))

    return app
}

exports.get_running = function get_running() {
    exports.get_instance().listen(5005, '127.0.0.1', function(e) {
        console.log("Running gtracker on port: 5005")
    })
}
