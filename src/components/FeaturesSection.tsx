// FeaturesSection.tsx
import { ArrowRight } from "lucide-react";
import { features } from "../data/data.ts";
import styles from "../styles/FeaturesSection.module.css";

const FeatureCard = ({ title, description, image, bgImage }: {
    title: string;
    description: string;
    image: string;
    bgImage: string;
}) => {
    return (
        <div className={styles.featureCard}>
            {/* Background image */}
            <div className={styles.bgImage}>
                <img src={bgImage} alt="bgImage" className={styles.bgImg} />
            </div>

            {/* Feature image */}
            <div className={styles.featureImage}>
                <img src={image} alt="" />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.learnMore}>
                    <a className={styles.link} href="#">Learn more</a>
                    <ArrowRight className={styles.arrow} />
                </div>
            </div>
        </div>
    );
};

// Features Section Component
const FeaturesSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>Features</h2>
                    <p className={styles.sectionDescription}>
                        Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;