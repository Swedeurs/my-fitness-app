import { useUser } from "@/hooks/use-user";
import Link from "next/link";


const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link href="/signup/client">Sign Up as Client</Link>
            </li>
            <li>
              <Link href="/signup/trainer">Sign Up as Trainer</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
