import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Features } from "./components/Features/Features";
import { Pricing } from "./components/Pricing/Pricing";
import { CTA } from "./components/CTA/CTA";
import { Footer } from "./components/Footer/Footer";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
