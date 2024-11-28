import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav
      style={{
        backgroundColor: "#1a1a1a", // Dark background color (adjust as needed)
        color: "#00ff66", // Electric blue text color
        padding: "1rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#00ff66" }}
        >
          Fitness App
        </Link>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            href="/dashboard"
            style={{
              color: "#00ff66",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#00ff66")}
          >
            Dashboard
          </Link>
          {user ? (
            <button
              onClick={logout}
              style={{
                backgroundColor: "#00ff66", // Electric blue background
                color: "#fff", // White text
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#4CAF50")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#00ff66")
              }
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login/client"
                style={{
                  color: "#00ff66",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#00ff66")}
              >
                Login as Client
              </Link>
              <Link
                href="/login/trainer"
                style={{
                  color: "#00ff66",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#00ff66")}
              >
                Login as Trainer
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
