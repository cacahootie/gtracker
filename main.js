
var app = require("./app")

var main = function main() {
    app.get_running()
}

if (require.main === module) {
    main()
}
