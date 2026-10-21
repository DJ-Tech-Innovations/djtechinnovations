import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { Spotlight } from "@/components/spotlight";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Value } from "@/components/sections/value";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Showcase } from "@/components/sections/showcase";
import { BuiltProjects, OngoingProjects, Partners } from "@/components/sections/projects";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Inquiry } from "@/components/sections/inquiry";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Spotlight />
      <Header />
      <main id="main">
        <Hero />
        <Value />
        <Services />
        <Industries />
        <Showcase />
        <BuiltProjects />
        <OngoingProjects />
        <Partners />
        <Why />
        <Process />
        <Inquiry />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
