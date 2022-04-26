import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div>
      <h1>Recipe Collection Login</h1>
      <div>
        {!isAuthenticated ? (
          <button onClick={loginWithRedirect}>Login</button>
        ) : (
          <button onClick={() => navigate("/")}>Enter App</button>
        )}
      </div>
      <div>
        <button onClick={signUp}>Create Account</button>
      </div>
    </div>
  );
}
