import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink className={styles.listItemLink} to="/pricing">
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.listItemLink} to="/product">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
