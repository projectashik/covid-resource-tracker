import Link from "next/link";
import { NavLink } from "./NavLink";
export const Navbar = () => {
  return (
    <nav className="bg-white shadow px-3 lg:px-8 py-3 flex justify-between items-center">
      <Link href="/">
        <a className="text-2xl text-red-500">Covid Resource Tracker</a>
      </Link>
      <ul className="flex gap-4">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/corona">Covid Data</NavLink>
        </li>
      </ul>
    </nav>
  );
};
