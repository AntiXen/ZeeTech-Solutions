import styles from './Hero.module.css';
import { HeroClient } from './HeroClient';

export default function Hero() {
  return (
    <section id="hero" className={styles.heroSection}>
      <HeroClient />
    </section>
  );
}
