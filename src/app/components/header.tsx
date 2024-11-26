import Link from "next/link";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/signup">Sign Up</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
