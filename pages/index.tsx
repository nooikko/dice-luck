import Head from 'next/head';

import { CallToAction } from '$page-components/Home/CallToAction';
import { Faqs } from '$page-components/Home/Faqs';
import { Footer } from '$components/General/Footer';
import { NavBar } from '$components/General/NavBar';
import { Hero } from '$page-components/Home/Hero';
import { Pricing } from '$page-components/Home/Pricing';
import { PrimaryFeatures } from '$page-components/Home/PrimaryFeatures';
import { SecondaryFeatures } from '$page-components/Home/SecondaryFeatures';
import { Testimonials } from '$page-components/Home/Testimonials';

export default function Home() {
  return (
    <>
      <Head>
        <title>TaxPal - Accounting made simple for small businesses</title>
        <meta
          name='description'
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don't get audited."
        />
      </Head>
      <NavBar />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
