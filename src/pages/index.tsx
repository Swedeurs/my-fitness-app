import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Fitness App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/signup/client">Sign Up as Client</Link>
          </li>
          <li>
            <Link href="/signup/trainer">Sign Up as Trainer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
