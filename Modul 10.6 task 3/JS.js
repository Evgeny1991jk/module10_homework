const btn = document.querySelector(".button");
const geo_btn = document.querySelector(".geo_button");
const inp = document.querySelector(".input");
const outp = document.querySelector(".output_window");

const Url = `wss://echo-ws-service.herokuapp.com`;

let websocket = new WebSocket(Url);

function writeToScreen(message, classes, tag) {
  let div = document.createElement("div");
  div.className = "your_msg";
  outp.append(div);
  let msg_response = document.createElement(tag);
  msg_response.className = classes;
  msg_response.innerHTML = message;
  div.append(msg_response);
}

btn.addEventListener("click", () => {
  const inputVal = document.querySelector(".input").value;
  if(!inputVal) {
    return;
  } else {
    writeToScreen(inputVal, "own_message", "p");
    websocket.send(inputVal);
  }
  websocket.onmessage = function(event) {
    writeToScreen(event.data, "server", "p");
  }
});

geo_btn.addEventListener("click", () => {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const latitude = coords.latitude;
      const longitude = coords.longitude;
      writeToScreen("location", "map", "a");
      const map = document.querySelector(".map");
      map.textContent = "Location";
      map.href = `https://www.openstreetmap.org/${latitude}/${longitude}`;
    });
  };
});