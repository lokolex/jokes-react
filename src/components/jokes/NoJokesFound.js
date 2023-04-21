import { Link } from "react-router-dom";
import styles from "./NoJokesFound.module.css";

const NoJokesFound = () => {
  return (
    <div className={styles["no-jokes"]}>
      <p>Шутка не найдена!</p>
      <Link to={`${process.env.PUBLIC_URL}/add-joke`} className="btn">
        Добавить шутку
      </Link>
    </div>
  );
};

export default NoJokesFound;
