import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";

export function TrainerSideNav() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      style={{
        width: "16rem",
        backgroundColor: "#000000",
        color: "#00ff66",
        padding: "1.5rem",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "2.5rem",
        }}
      >
        Trainer Dashboard
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link href="/chat-with-clients">
          <span
            style={{
              color: "#00ff66",
              textDecoration: "none",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
          >
            Chat with Clients
          </span>
        </Link>

        <Link href="/trainer-clients">
          <span
            style={{
              color: "#00ff66",
              textDecoration: "none",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
          >
            Clients
          </span>
        </Link>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#00ff66",
            color: "#000000",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            marginTop: "2rem",
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
