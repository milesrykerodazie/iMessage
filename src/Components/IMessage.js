import React from "react";
import "../Css/Imessage.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function IMessage() {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default IMessage;
