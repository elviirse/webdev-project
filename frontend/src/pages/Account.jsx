import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getCurrentUser(token);
        setUser(data.customer);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setError("Your session has expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <main className="auth-page">Loading account...</main>;
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>My Account</h1>

        {error && <p className="auth-error">{error}</p>}

        {user && (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Account;