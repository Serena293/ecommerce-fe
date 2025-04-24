import { useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!username || !password) {
        throw new Error("Username and Password are mandatory");
      }

      const loginUrl = "http://localhost:8080/login";

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);

      setUsername("");
      setPassword("");
      window.location.href = "/home";
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column w-35 gap-3 p-4 border rounded shadow-sm"
      >
        <h1 className="text-center mb-3">
          <FaSignInAlt className="me-2" />
          Login
        </h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label className="form-label">
            <FaUser className="me-2" />
            Username
          </label>
          <input
            className="form-control ps-4"
            placeholder="Insert Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FaLock className="me-2" />
            Password
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control pe-5 ps-4"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-2"
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
        <div>
          <div>Forgot your password? </div>
          <div> Sign in</div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
