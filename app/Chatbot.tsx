import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
    // Handle sending the message to the chatbot backend or perform any other actions
  };

  return (
    <div className="border border-gray-300 p-4 rounded">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <span className="font-bold">User:</span> {message}
        </div>
      ))}
      {/* Chat input */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default Chatbot;
