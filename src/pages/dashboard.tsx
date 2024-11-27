import { useUser } from "@/hooks/use-user";
import TrainerDashboard from "@/app/components/trainer-dashboard";
import ClientDashboard from "@/app/components/client-dashboard";


export default function Dashboard() {
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {user ? (
        user.role === "trainer" ? (
          <TrainerDashboard />
        ) : (
          <ClientDashboard />
        )
      ) : (
        // Render something in the case where the user is null
        <p className="text-lg text-gray-500">
          User information is not available at the moment. Please log in.
        </p>
      )}
    </div>
  );
}
