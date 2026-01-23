import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { setToken } from "../api/api";

export default function AuthForm({ onLogin, setMsg }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Name_REGEX = /^[a-zA-Z_ ]{2,30}$/;
  const Email_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  // At least one lowercase, one uppercase, one digit, one special char, min 8 length
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  async function handleRegister(e) {
    e.preventDefault();
     if (!Name_REGEX.test(name.trim())) {
    return setMsg("Name must be 2-30 letters only");
  }
    if (!Email_REGEX.test(email.trim())) {
    return setMsg("Invalid email format");
  }
    if (!Password_REGEX.test(password)) { return setMsg(
      "Password must be 8+ chars with Uppercase, Lowercase, Number & Special(@$!%*?&)"
    ); }
  
  
    setMsg("Registering...");
     
    const { ok, data } = await registerUser({ name, email, password });

    if (!ok) return setMsg(data.message || "Register failed");

    setMsg("Registered ✅ Now login");
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!Name_REGEX.test(name.trim())) {
    return setMsg("Name must be 2-30 letters only");
  }
  if (!Email_REGEX.test(email.trim())) {
    return setMsg("Invalid email format");
  }

  if (!Password_REGEX.test(password)) { return setMsg(
      "Password must be 8+ chars with Uppercase, Lowercase, Number & Special(@$!%*?&)"
    ); }
    setMsg("Logging in...");

    const { ok, data } = await loginUser({ email, password });

    if (!ok) return setMsg(data.message || "Login failed");

    setToken(data.token);
    setMsg("Login success ✅");
    onLogin();
  }

  return (
    <div>
      <h3 style={{ marginTop: "30px", marginRight: "0px", marginBottom: "5px", marginLeft: "0px" }}
>Register</h3>
      <form id ="Registration" onSubmit={handleRegister}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ width: '80px', marginRight: '10px' }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ width: '80px', marginRight: '10px' }}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ width: '80px', marginRight: '10px' }}>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        </div>
        <button className="button-primary"  type="submit" style={{ marginBlockEnd: 20 }}>Register</button>
      </form>  
        <hr/>
      <h3 style={{ margin: 20 }}>Login</h3>
      <form id ="Login" onSubmit={handleLogin} border ="2px">
        <button  className="button-primary" type="submit" >Login</button>
      </form>
    </div>
  );
}
