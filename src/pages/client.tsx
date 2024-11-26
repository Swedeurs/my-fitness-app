import UserInputForm from "@/app/components/forms/user-inputform";


export  function ClientSignUp() {
  return (
    <div>
      <h1>Client Sign Up</h1>
      <UserInputForm userRole="client" />
    </div>
  );
}

export function TrainerSignUp() {
  return (
    <div>
      <h1>Trainer Sign Up</h1>
      <UserInputForm userRole="trainer" />
    </div>
  );
}
