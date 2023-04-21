import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={`${process.env.PUBLIC_URL}/jokes`} activeClassName={styles.active}>
              Шутки
            </NavLink>
          </li>
          <li>
            <NavLink to={`${process.env.PUBLIC_URL}/add-joke`} activeClassName={styles.active}>
              Добавить шутку
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
