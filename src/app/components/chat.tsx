import { useUser } from "@/hooks/use-user";
import { ChatMessage } from "@/types";
import { useEffect, useState } from "react";

export default function Chat({ otherUserId }: { otherUserId: number }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const chatId = `${user.id}-${otherUserId}`;
        const response = await fetch(`/api/chat/${chatId}`);

        if (!response.ok) {
          console.error(`Response error, status: ${response.status}`);
          setError(`Unexpected response status: ${response.status}`);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response content type, expected JSON");
        }

        const data: ChatMessage[] = await response.json();
        setMessages(data.length > 0 ? data : []);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch chat messages:", error.message);
          setError("An unexpected error occurred. Please try again later.");
        } else {
          console.error("Unknown error:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
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
        {
          senderId: user.id,
          receiverId: otherUserId,
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to send message:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      } else {
        console.error("Unknown error:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto border rounded-lg shadow-lg p-4 flex flex-col h-[80vh] bg-gray-800">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Message Area */}
      <div className="overflow-y-auto flex-1 mb-4 space-y-3 px-4 py-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.senderId === user.id
                  ? "bg-green-400 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              } p-3 rounded-lg max-w-xs break-words`}
            >
              {msg.message}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="flex space-x-3 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-400 text-black py-3 px-5 rounded-lg hover:bg-green-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
