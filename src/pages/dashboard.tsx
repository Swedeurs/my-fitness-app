import { useRouter } from "next/router";
import { useUser } from "@/hooks/use-user";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    if (user.role === "trainer") {
      router.replace(`/dashboard/trainer/${user.id}`);
      return null;
    } else if (user.role === "client") {
      router.replace(`/dashboard/client/${user.id}`);
      return null;
    }
  }

  return (
    <div>
      <p className="text-lg text-gray-500">
        User information is not available at the moment. Please log in.
      </p>
    </div>
  );
}
