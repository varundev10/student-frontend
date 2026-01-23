import { useState } from "react";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./api/api";
import './App.css';


export default function App() {
  const [msg, setMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  return (
    <div  className = " MainClass" style={{ padding: 20, fontFamily: "Arial", MarginBlockEnd: 20 }}>
      <h2 className="heading" style={{ margin: 20 }} >Student App</h2>
      <p><b className= "status" >Status:</b> {msg}</p>

      {!loggedIn ? (
        <div className="container">
          <AuthForm
            setMsg={setMsg}
            onLogin={() => setLoggedIn(true)}
          />
        </div>
      ) : (
        <Dashboard setMsg={setMsg} />
      )}
      
    </div>
  );
}
