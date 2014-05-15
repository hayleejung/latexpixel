console.log("I am in connection.js");
var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
ws.onmessage = function (event) {
	connection.onmessage(event);
};

// return{
// 	onmessage : function(evt){
// 		return this;
// 	},

// 	send: function(msg){
// 		ws.send(JSON.stringify(msg));
// 		return this;
// 	}
// }