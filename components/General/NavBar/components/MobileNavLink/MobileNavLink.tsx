import { Popover } from '@headlessui/react';
import Link from 'next/link';

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children }) => {
  return (
    <Popover.Button as={Link} href={href} className='block w-full p-2'>
      {children}
    </Popover.Button>
  );
};
