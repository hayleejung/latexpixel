var moduleData = Array(38);

var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
console.log('connected to the server');

ws.onmessage = function (event) {
	var data = JSON.parse(event.data);
	if(data instanceof Array) {
		// Received every data
		moduleData = data;
		for(var i = 1; i < 38; i++) {
			if(data[i]['rise'] === true) {
				eManager.changeDrawType('Rise');
				eManager.expressHandler(i);
			} else if(data[i]['fall'] === true) {
				eManager.changeDrawType('Fall');
				eManager.expressHandler(i);
			} else if(data[i]['pulse'] === true) {
				eManager.changeDrawType('Pulse');
				eManager.expressHandler(i);
			} else if(data[i]['ripple'] === true) {
				eManager.changeDrawType('Ripple');
				eManager.expressHandler(i);
			}
		}
	} else {
		// Received one data: { id: n, mode: string, value: true/false }
		eManager.changeDrawType(data['mode']);
		if(data['value'] === true) eManager.expressHandler(data['id']);
	}

	// console.log(JSON.parse(event.data));
};

var sendmessage = function(msg) {
	ws.send(JSON.stringify(msg));
};