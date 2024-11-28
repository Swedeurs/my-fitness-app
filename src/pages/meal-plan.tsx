import MealPlan from "@/app/components/meal-plan";
import { SideNav } from "@/app/components/sidenav";
import Link from "next/link";

export default function MealPlanPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e0e0e0",
      }}
    >

      <SideNav />


      <div
        style={{
          flex: "1",
          padding: "2.5rem",
          maxWidth: "96rem",
          margin: "0 auto",
        }}
      >
        <MealPlan />
        <Link href="/dashboard"></Link>
      </div>
    </div>
  );
}
