import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { setToken } from "../api/api";

export default function AuthForm({ onLogin, setMsg }) {
  const [name, setName] = useState("SV");
  const [email, setEmail] = useState("sv@gmail.com");
  const [password, setPassword] = useState("123456");

  async function handleRegister(e) {
    e.preventDefault();
    setMsg("Registering...");

    const { ok, data } = await registerUser({ name, email, password });

    if (!ok) return setMsg(data.message || "Register failed");

    setMsg("Registered ✅ Now login");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("Logging in...");

    const { ok, data } = await loginUser({ email, password });

    if (!ok) return setMsg(data.message || "Login failed");

    setToken(data.token);
    setMsg("Login success ✅");
    onLogin();
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <br /><br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br /><br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <br /><br />
        <button type="submit">Register</button>
      </form>

      <h3 style={{ marginTop: 20 }}>Login</h3>
      <form onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
