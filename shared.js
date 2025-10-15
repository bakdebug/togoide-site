// shared.js
// Ortak iletişim omurgası (jury.html, player.html, audience.html arasında)

// 🔌 Ortak kanal oluştur
const channel = new BroadcastChannel("yarismakanali");

// Küresel olay dinleyicisi kaydı
export function onMessage(type, handler) {
  channel.addEventListener("message", (e) => {
    const data = e.data;
    if (data?.type === type) handler(data.payload);
  });
}

// 🎯 Mesaj gönderme fonksiyonu
export function sendMessage(type, payload = {}) {
  channel.postMessage({ type, payload });
}

// 🎮 Takım adını URL hash’inden oku (#A, #B, #C)
export function getTeamName() {
  const h = location.hash.replace("#", "").trim();
  return h || "Takım";
}

// 🕒 Geri sayım başlatıcı (isteğe bağlı)
export function startCountdown(duration, tickFn, endFn) {
  let timeLeft = duration;
  tickFn(timeLeft);
  const timer = setInterval(() => {
    timeLeft--;
    tickFn(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      endFn?.();
    }
  }, 1000);
  return timer;
}

// 🔕 Sayaç durdurucu
export function stopCountdown(timer) {
  if (timer) clearInterval(timer);
}