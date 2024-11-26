import { useUser } from "@/hooks/use-user";
import TrainerDashboard from "@/app/components/trainer-dashboard";
import ClientDashboard from "@/app/components/client-dashboard";

export default function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {user.role === "trainer" ? (
        <TrainerDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
}
