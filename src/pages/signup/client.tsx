import UserInputForm from "@/app/components/forms/user-inputform";
import { useRouter } from "next/router";

export default function ClientSignUp() {
  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Client Sign Up</h1>
      <UserInputForm userRole="client" onSuccess={handleSignUpSuccess} />
    </div>
  );
}
