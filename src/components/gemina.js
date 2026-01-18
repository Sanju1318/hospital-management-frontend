import { useState } from "react";
import "./Gemina.css"; // custom CSS import

function Gemina() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:3000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini";
      setResponse(text);
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemina-container">
      <div className="gemina-card">
        <h1 className="gemina-title">💬 Gemini AI Chat</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            rows={5}
            className="gemina-textarea"
          />
          <button type="submit" disabled={loading} className="gemina-button">
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>

        {/* ✅ Updated response section */}
        {response && (
          <div className="gemina-response">
            <div className="gemina-response-content">{response}</div>
          </div>
        )}
      </div>

      <footer className="gemina-footer">
        Powered by <span>Google Gemini API</span>
      </footer>
    </div>
  );
}

export default Gemina;
