import UserInputForm from "@/components/UserInputForm";

export default function ClientSignUp() {
  return (
    <div>
      <h1>Client Sign Up</h1>
      <UserInputForm userRole="client" />
    </div>
  );
}

export default function TrainerSignUp() {
  return (
    <div>
      <h1>Trainer Sign Up</h1>
      <UserInputForm userRole="trainer" />
    </div>
  );
}
