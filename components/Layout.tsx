import { ReactChildren } from 'react';
import { Navbar } from './Navbar/Navbar';
export const Layout = ({ children }: { children: any }) => {
  return (
    <div className='content bg-gray-100 min-h-screen'>
      <Navbar></Navbar>
      <div className=' mx-auto py-3'>{children}</div>
    </div>
  );
};
