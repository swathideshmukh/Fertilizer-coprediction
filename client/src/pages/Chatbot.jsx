import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AppShell from "../components/AppShell";
import { FaPaperPlane, FaRobot } from "react-icons/fa6";

const SERVER_API_URL =
  import.meta.env.VITE_SERVER_API_URL ||
  "https://fertilizer-coprediction-3.onrender.com";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello, Farmer. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await axios.post(`${SERVER_API_URL}/api/chatbot`, {
        message: trimmed,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't reach the assistant just now. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppShell
      title="AI Farming Assistant"
      subtitle="Smart agriculture support powered by AI"
    >
      <div className="max-w-3xl bg-[var(--paper)] border border-[var(--line)] rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
        {/* CHAT AREA */}
        <div className="h-[460px] overflow-y-auto p-6 space-y-4 bg-[var(--canvas)]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <div className="w-7 h-7 rounded-md bg-[var(--moss-900)] flex items-center justify-center text-[var(--wheat)] mr-2 shrink-0">
                  <FaRobot size={12} />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-lg text-sm leading-6 ${
                  msg.sender === "user"
                    ? "bg-[var(--moss-900)] text-white"
                    : "bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-md bg-[var(--moss-900)] flex items-center justify-center text-[var(--wheat)] mr-2 shrink-0">
                <FaRobot size={12} />
              </div>
              <div className="bg-[var(--paper)] border border-[var(--line)] px-4 py-2.5 rounded-lg text-sm text-[var(--ink-soft)]">
                Thinking…
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-[var(--line)] flex gap-3">
          <input
            type="text"
            placeholder="Ask a farming question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-[var(--line)] px-4 py-2.5 rounded-md text-sm outline-none focus:border-[var(--moss-700)] transition-colors"
          />

          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="bg-[var(--moss-900)] text-white px-5 rounded-md font-medium hover:bg-[var(--moss-700)] transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <FaPaperPlane size={12} />
            Send
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default Chatbot;
