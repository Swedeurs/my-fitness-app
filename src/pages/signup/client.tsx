import UserInputForm from "@/app/components/forms/user-inputform";


export default function ClientSignUp() {
  return (
    <div>
      <h1>Client Sign Up</h1>
      <UserInputForm userRole="client" />
    </div>
  );
}
