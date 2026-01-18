import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text(); // ✅ Safe response handling

      if (!text) {
        alert("No response from server");
        return;
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Save token, role, and name for dashboard
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      // ⚡ Save admin/user name dynamically
      localStorage.setItem("name", data.name || form.username);

      // Role-based redirect
      if (data.role === "ROLE_ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
