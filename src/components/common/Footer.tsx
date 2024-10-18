import "../../styles/common/Footer.css";
import mascota from "../../assets/img/mascota.png";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import GithubIcon from "../icons/GithubIcon";
import TikTokIcon from "../icons/TikTokIcon";
import LocationIcon from "../icons/LocationIcon";
import PhoneIcon from "../icons/PhoneIcon";
import EmailIcon from "../icons/EmailIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col" id="footer-company">
            <img src={mascota} alt="Logo" className="footer-logo" />
            <p>
              En Rodrigo Gremco, ofrecemos los mejores videojuegos a descuentos únicos precio veneco.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/migvel0413"
                target="_blank"
                rel="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://github.com/Hades0413"
                target="_blank"
                rel="Github"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.tiktok.com/@hades0413"
                target="_blank"
                rel="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="footer-col" id="footer-services">
            <h3>Services</h3>
            <div className="footer-links">
              <a href="#">Illustration</a>
              <a href="#">Creatives</a>
              <a href="#">Poster Design</a>
              <a href="#">Card Design</a>
            </div>
          </div>

          <div className="footer-col" id="footer-useful-links">
            <h3>Links</h3>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Our Policy</a>
              <a href="#">Help</a>
            </div>
          </div>

          <div className="footer-col" id="footer-contact">
            <h3>Contact</h3>
            <div className="footer-contact-details">
              <LocationIcon />
              <p>Lima Perú</p>
            </div>
            <div className="footer-contact-details">
              <PhoneIcon />
              <p>+1-8755856858</p>
            </div>
            <div className="footer-contact-details">
              <EmailIcon />
              <p>plutonsac@hotmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-row">
          <div className="footer-form">
            <form action="">
              <input type="text" placeholder="Email here..." />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M21 12l-18 12v-24l18 12zm0 0h-18m6 0v10m0-10h-6m6 0v-10m0 0h6m0 0v10m0-10h6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Plutón. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
