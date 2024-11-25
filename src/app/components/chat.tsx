import { useState, useEffect } from "react";

export default function Chat({ userId, otherUserId }: any) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch chat messages between userId and otherUserId
  }, [userId, otherUserId]);

  const sendMessage = async () => {
    // Send message to API
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.content}</div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
