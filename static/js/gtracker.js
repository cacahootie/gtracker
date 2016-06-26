
var gtracker = {},
    request = window.superagent

gtracker.get_location = function get_location (cb) {
    if (navigator.geolocation) {
        
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

gtracker.calc_speed = function calc_speed (start, size) {
    return (size * 8) / ((new Date().getTime() - start) / 1000) / 1000000
}

gtracker.run_test = function run_test () {
    navigator.geolocation.getCurrentPosition(function (position) {
        gtracker.test_download({
            "lat": position.coords.latitude,
            "lng": position.coords.longitude
        })
    })
}

gtracker.test_download = function test_download (record) {
    var request = window.superagent
    var start = new Date().getTime()
    request
        .get('/static/img/download.jpg')
        .end(function(err, res) {
            var mbps = gtracker.calc_speed(start, res.text.length)
            record.download = mbps
            $('download').text(mbps + " mbps download")
            gtracker.test_upload(record)
        })
}

gtracker.test_upload = function test_upload (record) {
    request = window.superagent
    var start = new Date().getTime(),
        uploadData = new Array(10000);
    for (var i = 0; i < uploadData.length; i++) {
        uploadData[i] = Math.floor(Math.random() * 256)
    }
    request
        .post('/permanentfile')
        .send(uploadData)
        .end(function(err, res) {
            var mbps = gtracker.calc_speed(start, uploadData.length)
            record.upload = mbps
            $('upload').text(mbps + " mbps upload")
            gtracker.test_ping(record)
        })
}

gtracker.test_ping = function test_ping (record) {
    var request = window.superagent
    var start = new Date().getTime()
    request
        .get('/permanentfile')
        .end(function(err, res) {
            record.ping = new Date().getTime() - start
            $('ping').text(record.ping + " msecs ping")
            gtracker.track(record)
        })
}

gtracker.track = function track (record) {
    record.obstime = new Date().toISOString()
    request
        .post('/track')
        .send(record)
        .end(function(err, res){
            console.log(record)
        })
}

gtracker.run_test_wait = function run_test_wait () {
    gtracker.run_test()
    window.setTimeout(gtracker.run_test_wait, 10000)
}

window.onload = function() {
    gtracker.run_test_wait()
}
