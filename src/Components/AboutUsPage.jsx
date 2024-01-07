import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

function AboutUsPage() {
  return (
    <main>
      <section className={styles["mainWrapper"]}>
        <section className={styles["introWrapper"]}>
          <div className={styles["introTextWrapper"]}>
            <h3>助你輕鬆搜尋</h3>
            <h1>附近的24小時開放急症室</h1>
            <p>
              同時還能夠了解附近醫院的專科門診時間表和最新的症狀輪候時間。<br></br>無論您需要緊急處理還是尋找其他醫療服務，這個網站都能幫助您找到最適合您需求的醫療資源。
            </p>
            <section className={styles["chooseServiceButtonWrapper"]}>
              <button id={styles["nearbyHospitalButton"]}>
                <Link to="/UrgentTrackProject">附近急症室</Link>
              </button>
              <button id={styles["chooseServiceButton"]}>
                <Link to="/service">專科服務</Link>
              </button>
            </section>
          </div>

          <div>
            <img
              src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg?w=1380&t=st=1704138563~exp=1704139163~hmac=5a196dd6626a106014470b51be11b5c0527a95fe9940e63d06004d1e802e77d4"
              className={styles["imgWrapper"] } 
            ></img>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AboutUsPage;
