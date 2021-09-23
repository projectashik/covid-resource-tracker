import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export const Navbar = () => {
  const { user, error, isLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className='bg-white shadow py-3'>
      <div className='relative container mx-auto px-3 md:px-1 flex flex-col md:flex-row md:justify-between md:items-center'>
        <Link href='/'>
          <a className='text-2xl text-red-500'>Covid Resource Tracker</a>
        </Link>
        <ul
          className={`gap-4 md:flex flex-col md:flex-row mt-6 md:mt-0 ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          <li>
            <NavLink href='/'>Home</NavLink>
          </li>
          <li>
            <NavLink href='/corona'>Covid Data</NavLink>
          </li>
          {!user && (
            <li>
              <NavLink href='/api/auth/login'>Login</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink href='/api/auth/logout'>Logout</NavLink>
            </li>
          )}
        </ul>
        <button
          onClick={toggleMenu}
          className='absolute right-0 top-1.5 block md:hidden'
        >
          <FontAwesomeIcon className='w-4 h-4' icon={faBars}></FontAwesomeIcon>
        </button>
      </div>
    </nav>
  );
};
