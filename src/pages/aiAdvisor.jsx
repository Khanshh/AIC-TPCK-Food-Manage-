import { useState, useEffect } from "react";

export default function AiAdvisor() {
  // Lấy tin nhắn từ sessionStorage nếu có
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("aiMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "ai",
            text: "Xin chào! Tôi là AI MealMind 🤖. Hãy hỏi tôi về thực đơn, dinh dưỡng hoặc công thức nấu ăn!",
          },
        ];
  });

  const [input, setInput] = useState("");

  // Cập nhật sessionStorage mỗi khi messages thay đổi
  useEffect(() => {
    sessionStorage.setItem("aiMessages", JSON.stringify(messages));
  }, [messages]);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Giả lập trả lời AI
    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: `Tôi đã nhận câu hỏi: "${input}". (AI đang suy nghĩ 🤔)`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput(""); // clear input
  };

  return (
    <section className="aiAdvisor">
      {/* Header */}
      <div className="ai-header">
        <h1>🤖 AI MealMind</h1>
        <div className="backHome" onClick={() => window.history.back()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="goHome" onClick={() => (window.location.href = "/")}>
          🏠 Trang chủ
        </div>
      </div>

      {/* Vùng chat */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            {msg.sender === "ai" ? "🤖 " : "🧑 "} {msg.text}
          </div>
        ))}
      </div>

      {/* Input + Gửi */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập câu hỏi về bữa ăn, dinh dưỡng..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </section>
  );
}
