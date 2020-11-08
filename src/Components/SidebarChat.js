import React, { useState, useEffect } from "react";
import "../Css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../features/chatSlice";
import db from "../firebase";
import * as timeago from "timeago.js";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data())),
      );
  }, [id]);

  const deleteChat = () => {
    const confirm = prompt("Type in room name to delete");
    if (confirm === chatName) {
      db.collection("chats")
        .doc(id)
        .delete()
        .then(alert("chat successfully deleted!"))
        .catch(console.log("Error removing document"));
    }
  };

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          }),
        )
      }
      className="sidebarChat"
    >
      <Avatar src={chatInfo[chatInfo.length - 1]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[chatInfo.length - 1]?.message}</p>
        <small>
          {timeago.format(
            new Date(chatInfo[chatInfo.length - 1]?.timestamp?.toDate()),
          )}
        </small>
        <div className="sidebarChatInfo__delete">
          <DeleteOutlineOutlinedIcon onClick={deleteChat} />
        </div>
      </div>
    </div>
  );
}

export default SidebarChat;
