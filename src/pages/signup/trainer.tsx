import UserInputForm from "@/app/components/forms/user-inputform";
import { useRouter } from "next/router";

export default function TrainerSignUp() {
  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Trainer Sign Up</h1>
      <UserInputForm userRole="trainer" onSuccess={handleSignUpSuccess} />
    </div>
  );
}
