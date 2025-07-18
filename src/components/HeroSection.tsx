import HeroImage from "../assets/heroimg.png";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  return (
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>
                Save your data storage here.
              </h1>
              <p className={styles.description}>
                Data Warehouse is a data storage area that has been tested for
                security, so you can store your data here safely but not be afraid
                of being stolen by others.
              </p>
              <button className={styles.ctaButton}>
                Learn more
              </button>
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.heroImage} src={HeroImage} alt="HeroImage" />
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;