import { useUser } from "@/hooks/use-user";
import { ChatMessage } from "@/types";
import { useEffect, useState } from "react";



export default function Chat({ otherUserId }: { otherUserId: number }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const chatId = `${user.id}-${otherUserId}`;
        const response = await fetch(`/api/chat/${chatId}`);
        const data: ChatMessage[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    };

    fetchMessages();
  }, [user, otherUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: otherUserId,
          message: newMessage,
        }),
      });

      setMessages((prev) => [
        ...prev,
        { senderId: user.id, receiverId: otherUserId, message: newMessage, timestamp: new Date().toISOString() },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto border rounded-md shadow-md p-4 flex flex-col justify-between h-96">
      <div className="overflow-y-auto mb-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.senderId === user.id
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            } p-2 rounded-lg max-w-xs`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
