import React, { forwardRef } from "react";
import "../Css/Message.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Message = forwardRef(
  (
    { id, contents: { timestamp, message, email, photo, uid, displayName } },
    ref,
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.uid === uid && "message__sender"}`}
      >
        <Avatar className="message__photo" src={photo} />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  },
);

export default Message;
