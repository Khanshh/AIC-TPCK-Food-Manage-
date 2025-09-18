import { useState, useEffect } from "react";

export default function AiAdvisor() {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("aiMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Thêm tin nhắn người dùng
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    const userQuestion = input;
    setInput(""); // clear ô input
    setLoading(true);

    try {
      // Gọi API backend
      const res = await fetch("http://localhost:3000/api/chatbot/u1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await res.json();

      if (res.ok) {
        // Thêm tin nhắn trả lời từ AI
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.answer || "🤖 Không có câu trả lời." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: `⚠️ Lỗi: ${data.message}` },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `❌ Không kết nối được tới server.` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="aiAdvisor">
      <div className="ai-header">
        <h1>🤖 AI MealMind</h1>
        <div className="backHome" onClick={() => window.history.back()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="goHome" onClick={() => (window.location.href = "/")}>
          🏠 Trang chủ
        </div>
      </div>

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

        {loading && (
          <div className="chat-message ai-message">🤖 Đang suy nghĩ...</div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập câu hỏi về bữa ăn, dinh dưỡng..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </section>
  );
}
