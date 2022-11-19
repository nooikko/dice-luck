import { Button } from '$components/General/Button';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  href: string;
  features: string[];
  featured?: boolean;
}

export const Plan: React.FC<PlanProps> = ({ name, price, description, href, features, featured }) => {
  return (
    <section className={`flex flex-col rounded-3xl px-6 sm:px-8 ${featured ? 'order-first bg-blue-600 py-8 lg:order-none' : 'lg:py-8'}`}>
      <h3 className='mt-5 font-display text-lg text-white'>{name}</h3>
      <p className={`mt-2 text-base ${featured ? 'text-white' : 'text-slate-400'}`}>{description}</p>
      <p className='order-first font-display text-5xl font-light tracking-tight text-white'>{price}</p>
      <ul role='list' className={`order-last mt-10 flex flex-col gap-y-3 text-sm${featured ? 'text-white' : 'text-slate-200'}`}>
        {features.map((feature) => (
          <li key={feature} className='flex'>
            <AiOutlineCheckCircle className={featured ? 'text-white' : 'text-slate-400'} />
            <span className='ml-4'>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        variant={featured ? 'solid' : 'outline'}
        color='white'
        className='mt-8'
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button>
    </section>
  );
};

export default Plan;
