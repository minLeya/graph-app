import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://zgwznptlltnofmscznav.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnd3pucHRsbHRub2Ztc2N6bmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjE1NjUsImV4cCI6MjA1NjQzNzU2NX0.YwIxpl321rvIDhGBqgX_WlEWW2rrvgLZPRQ-BZWzrFY");


export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) setError(error.message);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f3f3" }}>
      <div style={{ padding: "20px", width: "350px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          {isLogin ? "Вход в систему!!" : "Регистрация"}
        </h2>
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          onClick={handleAuth}
          style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "12px" }}
        >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"} 
          <span style={{ color: "#007BFF", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Зарегистрируйтесь" : " Войдите"}
          </span>
        </p>
      </div>
    </div>
  );
}
