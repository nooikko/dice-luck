import { Container } from '$components/General/Container';
import { Logo } from '$components/General/Logo';
import { NavLink } from '$components/General/NavLink';
import Link from 'next/link';
import { AiFillGithub, AiFillTwitterSquare } from 'react-icons/ai';

export function Footer() {
  return (
    <footer className='bg-slate-50'>
      <Container>
        <div className='py-16'>
          <Logo className='mx-auto h-10 w-auto' />
          <nav className='mt-10 text-sm' aria-label='quick links'>
            <div className='-my-1 flex justify-center gap-x-6'>
              <NavLink href='#features'>Features</NavLink>
              <NavLink href='#testimonials'>Testimonials</NavLink>
              <NavLink href='#pricing'>Pricing</NavLink>
            </div>
          </nav>
        </div>
        <div className='flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between'>
          <div className='flex gap-x-6'>
            <Link passHref href='https://twitter.com' className='group' aria-label='TaxPal on Twitter'>
              <AiFillTwitterSquare className='text-slate-400 group-hover:text-slate-500' />
            </Link>
            <Link passHref href='https://github.com' className='group' aria-label='TaxPal on GitHub'>
              <AiFillGithub className='h-6 w-6 fill-slate-500 group-hover:fill-slate-700' />
            </Link>
          </div>
          <p className='mt-6 text-sm text-slate-500 sm:mt-0'>Copyright &copy; {new Date().getFullYear()} TaxPal. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
