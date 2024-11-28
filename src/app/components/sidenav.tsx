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
        backgroundColor: "#1a1a1a", // Darker grey for modern look
        color: "#ffffff", // White text for contrast
        padding: "1.5rem",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "2.5rem",
          color: "#00ff66", // Electric blue for title
        }}
      >
        Dashboard
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#ffffff", // White for links
            textDecoration: "none",
            fontSize: "1.125rem",
            fontWeight: "500",
            transition: "color 0.3s",
          }}
          className="hover:text-blue-500"
        >
          Home
        </Link>
        <Link
          href="/meal-plan"
          style={{
            color: "#ffffff", // White for links
            textDecoration: "none",
            fontSize: "1.125rem",
            fontWeight: "500",
            transition: "color 0.3s",
          }}
          className="hover:text-blue-500"
        >
          Meal Plan
        </Link>
        <Link
          href="/workout-plan"
          style={{
            color: "#ffffff", // White for links
            textDecoration: "none",
            fontSize: "1.125rem",
            fontWeight: "500",
            transition: "color 0.3s",
          }}
          className="hover:text-blue-500"
        >
          Workout Plan
        </Link>
        <Link
          href="/chat"
          style={{
            color: "#ffffff", // White for links
            textDecoration: "none",
            fontSize: "1.125rem",
            fontWeight: "500",
            transition: "color 0.3s",
          }}
          className="hover:text-blue-500"
        >
          Chat with Trainer
        </Link>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#00ff66", // Electric blue for the button
            color: "#000000", // Black text for button contrast
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            marginTop: "2rem",
            fontSize: "1.125rem",
            fontWeight: "600",
            transition: "background-color 0.3s",
          }}
          className="hover:bg-blue-500"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
