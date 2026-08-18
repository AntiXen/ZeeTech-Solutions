import Hero from '@/components/Hero/Hero';
import Proposition from '@/components/Proposition/Proposition';
import Impact from '@/components/Impact/Impact';
import Capabilities from '@/components/Capabilities/Capabilities';
import WhatWeBuild from '@/components/WhatWeBuild/WhatWeBuild';
import SelectedWork from '@/components/SelectedWork/SelectedWork';
import Approach from '@/components/Approach/Approach';
import Founder from '@/components/About/Founder/Founder';
import WhyZeeTech from '@/components/About/WhyZeeTech/WhyZeeTech';
import Reviews from '@/components/Reviews/Reviews';
import Technology from '@/components/Technology/Technology';
import Contact from '@/components/Contact/Contact';
import WhatsAppFAB from '@/components/WhatsAppFAB/WhatsAppFAB';
import ScrollReset from '@/components/shared/ScrollReset/ScrollReset';

export default function Home() {
  return (
    <>
      <ScrollReset />
      <Hero />
      <Proposition />
      <Impact />
      <Capabilities />
      <WhatWeBuild />
      <SelectedWork />
      <Approach />
      <Founder />
      <WhyZeeTech />
      <Reviews />
      <Technology />
      <Contact />
      <WhatsAppFAB />
    </>
  );
}
