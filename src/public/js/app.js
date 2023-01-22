const messageList = document.querySelector("ul");
const chatForm = document.getElementById("message");
const nickForm = document.getElementById("nickname");
const socket = new WebSocket(`ws://${window.location.host}`);

const convertMsg = (type, payload) => {
    const data = {type, payload};
    return JSON.stringify(data);
};

socket.addEventListener("open", () => {
    console.log("Connected to Server!!💁‍♂️");
});

socket.addEventListener("message", ({data:message}) => {
    const li = document.createElement("li");
    li.innerText = message;
    messageList.appendChild(li);
});

socket.addEventListener("close", () => {
    console.log("❌disconnected from the Server❌");
});

const handleSubmit = (event) => {
    event.preventDefault();
    const input = chatForm.querySelector("input");
    socket.send(convertMsg("newMsg", input.value));
    input.value = "";
};

const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(convertMsg("setNick", input.value));
    input.value = "";
};

chatForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);