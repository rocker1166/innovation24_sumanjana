import { TimelineDemo } from "./component/FoodItem";
import Footer from "./component/Footer";
import { HeroParallaxDemo } from "./component/Hero";
import Header from "./component/nav";
import { TypewriterEffectSmoothDemo } from "./component/Typeeffect";

;

export default function Home() {
  return (
   <>
  <Header />
  <HeroParallaxDemo />
  <br></br>
  <TimelineDemo />
  <TypewriterEffectSmoothDemo />
  <Footer />
   </>
  );
}
