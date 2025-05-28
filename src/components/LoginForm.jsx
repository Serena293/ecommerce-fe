import { useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funzione per estrarre e normalizzare il ruolo
  const getNormalizedRole = (authorities) => {
    if (!authorities || authorities.length === 0) return "CUSTOMER";
    const role = authorities[0].authority;
    return role.replace("ROLE_", "");
  };

async function handleLogin(e) {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    if (!username || !password) {
      throw new Error("Username and Password are mandatory");
    }

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Prima verifica lo stato della risposta
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    // Poi processa la risposta
    const responseData = await response.json();
    console.log("Login response:", responseData); 
    console.log(typeof(responseData.token), " <---- tipo di response data")

    if (!responseData.token) {
      throw new Error("Token non ricevuto dal server");
    }

    // Estrae e normalizza il ruolo
    const normalizedRole = getNormalizedRole(responseData.authorities);

    console.log("ResponseData.token in LoginInForm", responseData.token)

    // Salva i dati
    localStorage.setItem("authToken", responseData.token);
    localStorage.setItem("userData", JSON.stringify({
      username: responseData.username,
      role: normalizedRole,
      email: responseData.email,
      userId: responseData.userId
    }));

    // Notifica il successo
    onLoginSuccess(responseData.token);

    // Naviga
    navigate(normalizedRole === 'ADMIN' ? "/admin" : "/profile");

  } catch (error) {
    console.error("Login error:", error);
    setError(error.message || "Errore durante il login");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column col-md-5 col-lg-4 col-xl-3 gap-3 p-4 border rounded shadow-sm bg-white"
      >
        <h1 className="text-center mb-3">
          <FaSignInAlt className="me-2" />
          Login
        </h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            <FaUser className="me-2" />
            Username
          </label>
          <input
            id="username"
            className="form-control ps-4"
            placeholder="Insert Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            <FaLock className="me-2" />
            Password
          </label>
          <div className="position-relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-control pe-5 ps-4"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="position-absolute end-0 top-50 translate-middle-y me-3 btn btn-link p-0"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark mt-2 py-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            <>
              <FaSignInAlt className="me-2" />
              Login
            </>
          )}
        </button>

        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-decoration-none">
            Forgot your password?
          </a>
          <div className="mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
