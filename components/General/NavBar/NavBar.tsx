import { Button } from '$components/General/Button';
import { Container } from '$components/General/Container';
import { Logo } from '$components/General/Logo';
import { NavLink } from '$components/General/NavLink';
import Link from 'next/link';

import { MobileNavigation } from './components/MobileNavigation';

export const NavBar = () => {
  return (
    <header className='py-10'>
      <Container>
        <nav className='relative z-50 flex justify-between'>
          <div className='flex items-center md:gap-x-12'>
            <Link passHref href='#' aria-label='Home'>
              <a>
                <Logo className='h-10 w-auto' />
              </a>
            </Link>
            <div className='hidden md:flex md:gap-x-6'>
              <NavLink href='#features'>Features</NavLink>
              <NavLink href='#testimonials'>Testimonials</NavLink>
              <NavLink href='#pricing'>Pricing</NavLink>
            </div>
          </div>
          <div className='flex items-center gap-x-5 md:gap-x-8'>
            <div className='hidden md:block'>
              <NavLink href='/login'>Sign in</NavLink>
            </div>
            <Button href='/register' color='blue'>
              <span>
                Get started <span className='hidden lg:inline'>today</span>
              </span>
            </Button>
            <div className='-mr-1 md:hidden'>
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
