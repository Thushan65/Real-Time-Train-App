/* Directive */
"use strict";
/* Namespace */
const ns_client = (() =>
{
/* References */
const statusBox = document.getElementById("status-box");
const subForm = document.getElementById("sub-form");
const subNaptan = document.getElementById("sub-form").elements["naptan-sub"];
const unsubForm = document.getElementById("unsub-form");
const unsubNaptan = document.getElementById("unsub-form").elements["naptan-unsub"];
/* Client Init */
const sock = new WebSocket("ws://127.0.0.1");

//const sock = new WebSocket(`ws://localhost:${webSockPort}`);

/* Script Start */
statusBox.innerHTML += `Loading...<br>`;

subForm.addEventListener("submit", (submitEvnt) =>
    {
    // Send sub/unsub to middleware
    const data =
    {
    msgType: "cmd",
    payload:
    {
    msg: "sub",
    topic: subNaptan.value
    }
    }
    // Prevent Default Behaviour (submitting a form, see URL with/without)
    submitEvnt.preventDefault();
    console.log(data.payload.msg);
    sock.send(JSON.stringify(data));
    });
    unsubForm.addEventListener("submit", (submitEvnt) =>
    {
    // Send sub/unsub to middleware
    const data =
    {
    msgType: "cmd",
    payload:
    {
    msg: "unsub",
    topic: unsubNaptan.value
    }
    }
    // Prevent Default Behaviour (submitting a form, see URL with/without)
    submitEvnt.preventDefault();
    console.log(data.payload.msg);
    sock.send(JSON.stringify(data));
    });

sock.addEventListener("close", (clsEvnt) =>
    {
    statusBox.innerHTML += `Closed with code: ${clsEvnt.code}<br>`;
    });
    sock.addEventListener("message", (msgEvent) =>
    {
    // Parse it
    const message = JSON.parse(msgEvent.data);
    // handle sub/unsub
    switch(message.msgType)
    {
    case "cmd":
    switch(message.payload.msg)
    {
    case "sub":
    statusBox.innerHTML += `Subscribed to ${message.payload.topic}<br>`;
    break;
    case "unsub":
    statusBox.innerHTML += `Unsubscribed from ${message.payload.topic}<br>`;
    break;
    }
    break;
    case "dat":
    // Could push this to a div or a section based on payload.topic
    statusBox.innerHTML += `${message.payload.topic}:${message.payload.msg}<br>`;
    break;
    default:
    break;
    }
    });
    sock.addEventListener("open", () =>
    {
    statusBox.innerHTML += `Connection opened<br>`;
    });

})();