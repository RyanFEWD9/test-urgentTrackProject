import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

function AboutUsPage() {
  return (
    <main>
    <section>
      <h3>助你輕鬆搜尋</h3>
      <h1>附近的24小時開放急症室</h1>
      <p>
        同時還能夠了解附近醫院的專科門診時間表和最新的症狀輪候時間。無論您需要緊急處理還是尋找其他醫療服務，這個網站都能幫助您找到最適合您需求的醫療資源。
      </p>
      <button>
        <Link to="/UrgentTrackProject">附近急症室</Link>
      </button>
      <button>
        <Link to="/service">專科服務</Link>
      </button>
    </section>
    </main>
  );
}

export default AboutUsPage;
