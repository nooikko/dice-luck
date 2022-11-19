import { Plan } from './components/Plan';
import { Container } from '$components/General/Container';

export function Pricing() {
  return (
    <section id='pricing' aria-label='Pricing' className='bg-slate-900 py-20 sm:py-32'>
      <Container>
        <div className='md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            <span className='relative whitespace-nowrap'>
              <span className='relative'>Simple pricing,</span>
            </span>{' '}
            for everyone.
          </h2>
          <p className='mt-4 text-lg text-slate-400'>It doesn’t matter what size your business is, our software won’t work well for you.</p>
        </div>
        <div className='-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8'>
          <Plan
            name='Starter'
            price='$9'
            description='Good for anyone who is self-employed and just getting started.'
            href='/register'
            features={[
              'Send 10 quotes and invoices',
              'Connect up to 2 bank accounts',
              'Track up to 15 expenses per month',
              'Manual payroll support',
              'Export up to 3 reports',
            ]}
          />
          <Plan
            featured
            name='Small business'
            price='$15'
            description='Perfect for small / medium sized businesses.'
            href='/register'
            features={[
              'Send 25 quotes and invoices',
              'Connect up to 5 bank accounts',
              'Track up to 50 expenses per month',
              'Automated payroll support',
              'Export up to 12 reports',
              'Bulk reconcile transactions',
              'Track in multiple currencies',
            ]}
          />
          <Plan
            name='Enterprise'
            price='$39'
            description='For even the biggest enterprise companies.'
            href='/register'
            features={[
              'Send unlimited quotes and invoices',
              'Connect up to 15 bank accounts',
              'Track up to 200 expenses per month',
              'Automated payroll support',
              'Export up to 25 reports, including TPS',
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
