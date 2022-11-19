import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  return (
    <Link href={href} className='inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900'>
      {children}
    </Link>
  );
};
