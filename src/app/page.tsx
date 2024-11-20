import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Fitness App</h1>
      <nav>
        <ul>
          <li><Link href="/signup">Sign Up</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}
