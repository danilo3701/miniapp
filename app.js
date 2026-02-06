/* =========================
   app.js = "мозги" страницы
   =========================
   Тут происходит то, что в боте делал Aiogram:
   - мы держим состояние (state)
   - реагируем на события (клик по кнопке)
   - обновляем интерфейс (render)

   Очень важная идея:
   UI = функция от state
   (если state поменялся → мы перерисовали UI)
*/

/* -------------------------
   1) Удобный помощник $
   -------------------------
   Вместо document.getElementById(...) каждый раз,
   пишем $("id") = так быстрее и чище.
*/
const $ = (id) => document.getElementById(id);

/* -------------------------
   2) Ссылки на элементы UI
   -------------------------
   Это как "message / keyboard" в боте,
   только здесь это элементы страницы.
*/
const envPill = $("envPill");
const timePill = $("timePill");

const title = $("title");
const subtitle = $("subtitle");

const clicksValue = $("clicksValue");
const modeValue = $("modeValue");

const logEl = $("log");

const btnClick = $("btnClick");
const btnReset = $("btnReset");

/* -------------------------
   3) State (состояние)
   -------------------------
   Аналогия:
   - в Aiogram ты держишь данные в FSMContext
   - здесь мы держим данные в обычном объекте state
*/
const state = {
  clicks: 0,         // сколько раз нажали кнопку
  mode: "browser",   // browser или telegram
  isTelegram: false, // true если Telegram.WebApp существует
};

/* -------------------------
   4) Логирование на экран
   -------------------------
   В реальной жизни ты бы смотрел Console (F12),
   но мы делаем "учебный лог" прямо на странице.
*/
function log(msg) {
  const ts = new Date().toLocaleTimeString();
  logEl.textContent += `\n[${ts}] ${msg}`;
  logEl.scrollTop = logEl.scrollHeight;
}

/* -------------------------
   5) Время (бейдж TIME)
   ------------------------- */
function setTime() {
  timePill.textContent = `TIME: ${new Date().toLocaleString()}`;
}

/* -------------------------
   6) Определяем окружение
   -------------------------
   Когда мы запустим внутри Telegram:
   window.Telegram.WebApp будет существовать.
   Сейчас мы в браузере — его обычно нет.
*/
function detectEnv() {
  state.isTelegram = typeof window.Telegram !== "undefined" && !!window.Telegram.WebApp;
  state.mode = state.isTelegram ? "telegram" : "browser";
}

/* -------------------------
   7) render() = перерисовка UI
   -------------------------
   Это ключевой принцип фронта:
   state -> UI
*/
function render() {
  // 7.1) Обновляем ENV и MODE
  envPill.textContent = state.isTelegram ? "ENV: Telegram" : "ENV: Browser";
  modeValue.textContent = state.mode;

  // 7.2) Обновляем счётчик кликов
  clicksValue.textContent = String(state.clicks);

  // 7.3) Меняем заголовки в зависимости от clicks
  if (state.clicks === 0) {
    title.textContent = "Привет, Dani 👋";
    subtitle.textContent = "Это обычная веб-страница. Нажми кнопку и смотри, как меняется UI.";
  } else {
    title.textContent = "Опа. Работает.";
    subtitle.textContent = "Клик → state меняется → render обновляет UI.";
  }

  // 7.4) Обновляем время
  setTime();
}

/* -------------------------
   8) События (handlers)
   -------------------------
   Аналогия:
   - в боте у тебя handler на callback / message
   - здесь handler на click
*/
btnClick.addEventListener("click", () => {
  // 8.1) Меняем state
  state.clicks += 1;

  // 8.2) Пишем в лог
  log(`Клик: clicks=${state.clicks}`);

  // 8.3) Перерисовываем UI
  render();
});

btnReset.addEventListener("click", () => {
  // 8.4) Сброс state
  state.clicks = 0;

  // 8.5) Чистим лог (как очистка временных ключей в FSM)
  logEl.textContent = "Сброс. Страница в исходном состоянии.";

  // 8.6) Перерисовываем UI
  render();
});

/* -------------------------
   9) Инициализация (startup)
   -------------------------
   Это как "on_startup" у бота:
   - определили окружение
   - написали лог
   - отрендерили UI
*/
detectEnv();
log(`Запуск. mode=${state.mode}`);
render();
