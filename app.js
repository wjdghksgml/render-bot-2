const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

// ping을 보낼 대상 서버 목록
const TARGET_URLS = [
  "https://supernova-zcgt.onrender.com",
  "https://render-bot-1.onrender.com", // 🔁 render bot 1에서는 bot 2의 주소로 바꾸세요!
  // render bot 2에서는 이 줄을: "https://render-bot-2.onrender.com"로 바꾸기!
];

// 루트 확인용
app.get("/", (req, res) => {
  res.send("Render Bot 작동 중! 🛠️");
});

// 10분마다 대상 서버에 ping
setInterval(() => {
  TARGET_URLS.forEach((url) => {
    fetch(url)
      .then(() =>
        console.log(`[PING] ${url} 호출 성공: ${new Date().toISOString()}`)
      )
      .catch((err) =>
        console.error(`[PING] ${url} 호출 실패: ${err.message}`)
      );
  });
}, 10 * 60 * 1000); // 10분 간격

app.listen(PORT, () => {
  console.log(`Render Bot 서버 실행 중 (포트: ${PORT})`);
});
