import { useState } from "react";
import styles from "./Opinion.module.css";

function Opinion() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");

  function handleSubmission() {
    localStorage.clear();
    let userData = {
      Name: name,
      Email: email,
      Text: text,
      Number: number,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));
    document.getElementsByClassName("span").style = "block";
    alert("Data recorded!");
    window.location.reload();
  }

  let userInfo = "";
  function toggleGetData() {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.Email);
    setName(userInfo.Name);
    setEmail(userInfo.Email);
    setText(userInfo.Text);
    setNumber(userInfo.Number);
  }

  return (
    <div>
      <h1>意見箱</h1>
      <div className={`box ${styles.hotlineWithNameWrapper}`}>
        <div>
          <form>
            <label htmlFor="name">
              姓名 &nbsp;
              <input
                id="enter-name"
                type="text"
                className="txtfield w-input"
                maxLength="20"
                name="enter-name"
                data-name="enter-name"
                placeholder="輸入姓名"
                onChange={(e) => setName(e.target.value)}
                style={{ textAlign: "center" }}
              />
            </label>
          </form>
          <br />
          <label htmlFor="tel">
            電話 &nbsp;
            <input
              id="enter-tel"
              type="text"
              className="txtfield w-input"
              minLength="8"
              maxLength="25"
              name="enter-tel2"
              placeholder="輸入電話"
              onChange={(e) => setText(e.target.value)}
              style={{ textAlign: "center" }}
            />
          </label>
          <br />
          <label htmlFor="email">
            電郵 &nbsp;
            <input
              id="enter-email"
              type="text"
              className="txtfield w-input"
              maxLength="1000"
              name="enter-email2"
              placeholder="輸入電郵"
              onChange={(e) => setEmail(e.target.value)}
              style={{ textAlign: "center" }}
            />
          </label>
          <br />

          <label htmlFor="text">
            內容 &nbsp;
            <textarea
              name="enter-content"
              id="enter-content"
              title="輸入內容"
              placeholder="輸入內容"
              maxLength="1000"
              className={`txt_area w-input ${styles.textarea}`}
              onChange={(e) => setText(e.target.value)}
              style={{ textAlign: "center" }}
            />
          </label>
          <br />

          <button onClick={handleSubmission} className="subscribeButton">
            提交
          </button>
        </div>
      </div>
    </div>
  );
}

export default Opinion;
