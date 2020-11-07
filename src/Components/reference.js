import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={message.id}
              username={message.senderId}
              text={message.text}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;

import React from "react";

function Message(props) {
  return (
    <div className="message">
      <div className="message-username">{props.username}</div>
      <div className="message-text">{props.text}</div>
    </div>
  );
}

export default Message;

const messages = document.getElementById("messages");

function appendMessage() {
  const message = document.getElementsByClassName("message")[0];
  const newMessage = message.cloneNode(true);
  messages.appendChild(newMessage);
}

function getMessages() {
  // Prior to getting your messages.
  shouldScroll =
    messages.scrollTop + messages.clientHeight === messages.scrollHeight;
  /*
   * Get your messages, we'll just simulate it by appending a new one syncronously.
   */
  appendMessage();
  // After getting your messages.
  if (!shouldScroll) {
    scrollToBottom();
  }
}

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

scrollToBottom();

setInterval(getMessages, 100);

// example code

import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

function createItem() {
  const characters = "abcdefghijklmnopqrstuvwxyz".split("");
  return characters[Math.floor(Math.random() * characters.length)];
}

function Item(props) {
  return <li>{props.value}</li>;
}

export default function App() {
  const scrollRef = useRef(null);
  const [list, setList] = useState([]);

  /* whenever the list changes we need to scroll our
     last list item into view */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [list]);

  return (
    <>
      <ul>
        {list.map((item) => (
          <Item value={item} />
        ))}
        {/* this is the last item that scrolls into
             view when the effect is run */}
        <li ref={scrollRef} />
      </ul>
      <button onClick={() => setList((list) => [...list, createItem()])}>
        Add Item
      </button>
    </>
  );
}
