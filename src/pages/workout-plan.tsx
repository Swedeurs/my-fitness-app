
import { SideNav } from "@/app/components/sidenav";
import WorkoutPlan from "@/app/components/workout-plan";
import Link from "next/link";

export default function WorkoutPlanPage() {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e0e0e0' }}>
        {/* Side Navigation */}
        <SideNav />
  
        {/* Main Content */}
        <div style={{ flex: '1', padding: '2.5rem', maxWidth: '96rem', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#00ff66' }}>Workout Plan</h1>
          <WorkoutPlan />
          <Link href="/dashboard">
          </Link>
        </div>
      </div>
    );
  }