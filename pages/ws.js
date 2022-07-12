import React, { useState, useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import useWebSocket, { ReadyState } from "react-use-websocket";

// https://www.npmjs.com/package/react-use-websocket

const WebSocketDemo = () => {
  const [socketUrl, setSocketUrl] = useState(
    "ws://0.tcp.sa.ngrok.io:16544/?application=62c306bacea2c011a13b0778"
  );
  const [message, setMessage] = useState("");
  const [inputSocketValue, setInputSocketValue] = useState(socketUrl);
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: { description: "Connecting", classType: "info" },
    [ReadyState.OPEN]: { description: "Open", classType: "success" },
    [ReadyState.CLOSING]: { description: "Closing", classType: "info" },
    [ReadyState.CLOSED]: { description: "Closed", classType: "danger" },
    [ReadyState.UNINSTANTIATED]: {
      description: "Uninstantiated",
      classType: "warning",
    },
  }[readyState];

  return (
    <AppLayout>
      <div className="row">
        <div className="col-12">
          <h3 className="my-4">Websocket example</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <label className="form-label">Socket url</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Message"
              aria-label="Message"
              aria-describedby="button-addon2"
              value={inputSocketValue}
              onChange={(event) => setInputSocketValue(event.target.value)}
            />
            <button
              className={`btn btn-${
                readyState === ReadyState.OPEN ? "success" : "secondary"
              }`}
              type="button"
              id="button-addon2"
              onClick={() => setSocketUrl(inputSocketValue)}
              disabled={!socketUrl}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5 className="my-4">
            Status:{" "}
            <span
              className={`badge rounded-pill bg-${connectionStatus.classType}`}
            >
              {connectionStatus.description}
            </span>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Message"
              aria-label="Message"
              aria-describedby="button-addon2"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={readyState !== ReadyState.OPEN}
            />
            <button
              className={`btn btn-${
                readyState === ReadyState.OPEN ? "success" : "secondary"
              }`}
              type="button"
              id="button-addon2"
              onClick={handleClickSendMessage}
              disabled={readyState !== ReadyState.OPEN}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5 className="my-4">Last message:</h5>
          {lastMessage && (
            <div className="alert alert-success" role="alert">
              {lastMessage.data}
            </div>
          )}

          <h5 className="my-4">Message history: </h5>
          <ul className="list-group">
            {messageHistory.map((message, idx) => (
              <li key={idx} className="list-group-item">
                {message?.data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default WebSocketDemo;
