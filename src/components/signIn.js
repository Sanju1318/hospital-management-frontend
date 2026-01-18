import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", password: "", role: "ROLE_USER" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL; // Render backend URL from .env

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      alert("Username and password are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Try parse JSON, fallback to text
      let result;
      try {
        result = await res.json();
        alert(result.message || "Signup successful");
      } catch {
        result = await res.text();
        alert(result);
      }

      // Reset form on success
      if (res.ok) {
        setForm({ username: "", password: "", role: "ROLE_USER" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Signup</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        disabled={isSubmitting}
      >
        <option value="ROLE_USER">User</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>

      <button onClick={signup} disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Signup"}
      </button>
    </div>
  );
}
