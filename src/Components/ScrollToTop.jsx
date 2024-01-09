import ScrollToTop from "react-scroll-to-top";
import styles from "../App.module.css";

function ScrollTop() {
  return (
    <div>
      <ScrollToTop smooth className={styles.smallArrow} />
    </div>
  );
}

export default ScrollTop;
