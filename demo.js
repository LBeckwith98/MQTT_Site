
host = "127.0.0.1";
port = "1884";
clientID = "clientID-" + parseInt(Math.random() * 100);
client = new Paho.MQTT.Client(host, Number(port), clientID);
client.onConnectionLost = onConnectionLost;
client.connect();
// Called after form input is processed
/*
function startConnect() {
    host = "127.0.0.1";
    port = "1884";

    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);
    
    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';


    
    
    // Set callback handlers

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    /*client.connect({ 
        onSuccess: onConnect,
    });
    client.connect();
}
*/

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = document.getElementById("topic").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    sub(topic);
}

function sub(topic) {
    client.subscribe(topic);
}

function publish() {
    topic = document.getElementById("pubTopic").value;
    content = document.getElementById("pubMsg").value;

    message = new Paho.MQTT.Message(content);
    message.destinationName = topic;

    client.send(message);
}

function bedroom_light_on() {
    console.log("Turning light on...")
    message = new Paho.MQTT.Message("ON");
    message.destinationName = "BEDROOM/LAMP";

    client.send(message);
}

function bedroom_light_off() {
    console.log("Turning light off...")
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = "BEDROOM/LAMP";

    client.send(message);
}

function bedroom_record_player_on() {
    console.log("Turning music on...")
    message = new Paho.MQTT.Message("ON");
    message.destinationName = "BEDROOM/RECORD";

    client.send(message);
}

function bedroom_record_player_off() {
    console.log("Turning music off...")
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = "BEDROOM/RECORD";

    client.send(message);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}