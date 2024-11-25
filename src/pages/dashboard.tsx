import ClientDashboard from "@/app/components/clientdshboard";
import TrainerDashboard from "@/app/components/trainer-dashboard";
import { useUser } from "@/hooks/use-user";


export default function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === "client" ? <ClientDashboard /> : <TrainerDashboard />}
    </div>
  );
}
