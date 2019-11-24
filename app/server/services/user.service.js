const zerorpc = require("zerorpc");

/**
 * Call process from python script
 */
exports.getVisibleDates = (lat, lng) => {
  var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

client.invoke("hello", "RPC", function(error, res, more) {
    console.log(res);
});
}


