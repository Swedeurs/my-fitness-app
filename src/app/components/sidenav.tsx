import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { useRouter } from "next/router";

export function SideNav() {
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
      }}
    >
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "2.5rem",
        }}
      >
        Dashboard
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#00ff66",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Home
        </Link>
        <Link
          href="/meal-plan"
          style={{
            color: "#00ff66",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Meal Plan
        </Link>
        <Link
          href="/workout-plan"
          style={{
            color: "#00ff66",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Workout Plan
        </Link>
        <Link
          href="/chat"
          style={{
            color: "#00ff66",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
        >
          Chat with Trainer
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
