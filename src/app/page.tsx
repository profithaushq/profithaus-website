import Hero from "@/components/home/Hero";
import PointOfView from "@/components/home/PointOfView";
import ScrollBand from "@/components/home/ScrollBand";
import Approach from "@/components/home/Approach";
import About from "@/components/home/About";
import HowItBegins from "@/components/home/HowItBegins";
import Close from "@/components/home/Close";

export default function Home() {
  return (
    <>
      <Hero />
      <PointOfView />
      <ScrollBand />
      <Approach />
      <About />
      <HowItBegins />
      <Close />
    </>
  );
}
