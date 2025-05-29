import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const UserInfo = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getUser/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      setUserData(null);
      console.error("Err : while fetching userInfo", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedData();
    // eslint-disable-next-line
  }, [userId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
        <div className="spinner"></div>
        <style>{`
          .spinner {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!userData) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "#e74c3c",
          fontSize: "1.3rem",
        }}
      >
        User not found or failed to load.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          padding: "2.5rem 2.5rem 2rem 2.5rem",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 1.5rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: "2px",
            boxShadow: "0 4px 24px 0 rgba(33,147,176,0.15)",
          }}
        >
          {userData.name ? userData.name[0].toUpperCase() : "?"}
        </div>
        <h2 style={{ margin: "0 0 0.5rem", color: "#222", fontWeight: 700 }}>
          {userData.name}
        </h2>
        <p style={{ color: "#555", margin: "0 0 1.2rem", fontSize: "1.1rem" }}>
          {userData.email}
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.5)",
            borderRadius: "12px",
            padding: "1.2rem 1rem",
            marginBottom: "1.2rem",
            boxShadow: "0 2px 8px 0 rgba(33,147,176,0.07)",
          }}
        >
          <div
            style={{
              marginBottom: "0.7rem",
              fontSize: "1.05rem",
              color: "#333",
            }}
          >
            <strong>Phone:</strong> {userData.phoneNo}
          </div>
          <div style={{ fontSize: "1.05rem", color: "#333" }}>
            <strong>User ID:</strong> {userData._id}
          </div>
        </div>
        <div style={{ color: "#888", fontSize: "0.95rem" }}>
          Registered User
        </div>
        <button
          onClick={() => (window.location.href = "/home")}
          style={{
            marginTop: "2rem",
            padding: "0.7rem 2.2rem",
            background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(33,147,176,0.10)",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)")
          }
        >
          Go Home
        </button>
        <button
          onClick={async () => {
            try {
              await axios.get("http://localhost:3000/api/logout", {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (e) {
              // Optionally handle error
              console.error("Error logging out", e);
            } finally {
              window.location.href = "/";
            }
          }}
          style={{
            marginTop: "1rem",
            marginLeft:"10px",
            padding: "0.7rem 2.2rem",
            background: "linear-gradient(90deg, #e74c3c 0%, #fdcb6e 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(231,76,60,0.10)",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #fdcb6e 0%, #e74c3c 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #e74c3c 0%, #fdcb6e 100%)")
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
