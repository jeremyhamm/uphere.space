const zerorpc = require("zerorpc");

/**
 * Call process from python script
 */
exports.getVisibleDates = () => {
  var client = new zerorpc.Client();
  client.connect("tcp://127.0.0.1:4242");

  client.invoke("hello", "RPC", function(error, res) {
    console.log(res);
  });
};


