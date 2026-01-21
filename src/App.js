import { useState } from "react";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./api/api";

export default function App() {
  const [msg, setMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Student App</h2>
      <p><b>Status:</b> {msg}</p>

      {!loggedIn ? (
        <AuthForm
          setMsg={setMsg}
          onLogin={() => setLoggedIn(true)}
        />
      ) : (
        <Dashboard setMsg={setMsg} />
      )}
    </div>
  );
}
