import UserDashboard from "@/app/components/user-dashboard";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <UserDashboard />
    </div>
  );
}
