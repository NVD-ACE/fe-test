import Logo from '../assets/Logo.png';
import Mess from '../assets/mess.png';
import { BsGithub, BsInstagram, BsYoutube } from "react-icons/bs";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.companyInfo}>
              <div className={styles.logoSection}>
                <div className={styles.logoContainer}>
                  <img alt="Logo" src={Logo} className={styles.logo} />
                </div>
                <h3 className={styles.companyName}>DataWarehouse</h3>
              </div>
              <address className={styles.address}>
              <span className={styles.addressBold}>
                Warehouse Society, 234<br />
                Bahagia Ave Street PRBW 29281<br />
              </span>
                <br />
                info@warehouse.project<br />
                1-232-3434 (Main)
              </address>
            </div>

            <div className={styles.aboutSection}>
              <h3 className={styles.sectionTitle}>About</h3>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>Profile</a></li>
                <li><a href="#" className={styles.link}>Features</a></li>
                <li><a href="#" className={styles.link}>Careers</a></li>
                <li><a href="#" className={styles.link}>DW News</a></li>
              </ul>
            </div>

            <div className={styles.helpSection}>
              <h3 className={styles.sectionTitle}>Help</h3>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>Support</a></li>
                <li><a href="#" className={styles.link}>Sign up</a></li>
                <li><a href="#" className={styles.link}>Guide</a></li>
                <li><a href="#" className={styles.link}>Reports</a></li>
                <li><a href="#" className={styles.link}>Q&A</a></li>
              </ul>
            </div>

            <div className={styles.socialSection}>
              <h3 className={styles.sectionTitle}>Social Media</h3>
              <div className={styles.socialIcons}>
                <div className={styles.socialIcon}>
                <span className={styles.iconWrapper}>
                  <BsYoutube />
                </span>
                </div>
                <div className={styles.socialIcon}>
                <span className={styles.iconWrapper}>
                  <BsInstagram />
                </span>
                </div>
                <div className={styles.socialIcon}>
                <span className={styles.iconWrapper}>
                  <BsGithub />
                </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              © Datawarehouse™, 2020. All rights reserved.<br />
              Company Registration Number: 21479524.
            </p>
            <div className={styles.messIcon}>
              <img src={Mess} alt="" className={styles.messImage} />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;