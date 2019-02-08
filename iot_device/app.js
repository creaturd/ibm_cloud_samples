//************ SETTINGS **************

var mqtt = {
	host: "04olm0.messaging.internetofthings.ibmcloud.com",
	port: 443,
	client: "d:04olm0:Meteo:45f",
	user: "use-token-auth",
	password: "oNcp0NxX3Ab(gzca3u"
};

/*
	Event topic format:
	iot-2/evt/<event_id>/fmt/<format_string(i.e.JSON)>
*/

//************************************

var Active = false;
var Connected = false;

Client = undefined;



function init() {
	/*$("body").keydown(function(event) {
	});*/
}

function onError() {
	console.error("Connection error!");
}
function onConnected() {
	console.log("connected");
	Connected = true;
	//Client.subscribe("devices/lora/#");
	Client.publish("iot-2/evt/humidity/fmt/JSON", JSON.stringify({current_time: Date.now()}));
};

function onConnectionLost(responseObject) {
	console.warn("Disconnected!");
	Connected = false;
	if (responseObject.errorCode !== 0) {

	}
};
function onMessageArrived(message) {
	try {
		
	} catch(E) {
		console.error(E);
	}

};

function connect() {
	var options = {
		useSSL: true,
		userName: mqtt.user,
		password: mqtt.password,
		onSuccess: onConnected,
		onFailure: onError
	};
	console.log("Connecting to "+ mqtt.host);
	Client = new Paho.MQTT.Client(mqtt.host, mqtt.port, mqtt.client);
	Client.onConnectionLost = onConnectionLost;
	Client.onMessageArrived = onMessageArrived;
	Client.connect(options);
}



$(document).ready(function(){
	init();
	connect();
});


/*
mosquitto_pub -h localhost -t "devices/lora/server" -m "{\"data\": {\"luminosity\": 1300,\"Address\": \"C\"},\"status\":{\"devEUI\": \"807b85902000040a\",\"rssi\": 0,\"temperature\": 0,\"battery\": 0,\"date\":\"2017-02-21T13:02:21.147555Z\"}}"
*/
