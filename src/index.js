import "./styles.css";

// The lang attribute is set at compile time by html-webpack-plugin
const PAGE_LANG = document.querySelector("html").lang;

const busyGifs = [
  "https://media.giphy.com/media/q6RoNkLlFNjaw/giphy.gif",
  "https://media.giphy.com/media/25L8qEAZO20LK/giphy.gif",
  "https://media.giphy.com/media/DZR39sOOQWP8A7UoVs/giphy.gif",
  "https://media.giphy.com/media/11JTxkrmq4bGE0/giphy.gif"
];

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Remember preferred lang onclick lang-switch
document.querySelector("#lang-switch").onclick = e => {
  e.preventDefault();

  setCookie("lang", PAGE_LANG === "en" ? "es" : "en");
  window.location = e.target.href;
};

/**
 * Returns true if browser language is "es", i.e., Spanish
 *
 * navigator.language(Netscape - Browser Localization)
 * navigator.browserLanguage(IE - Specific - Browser Localized Language)
 */
const isEsBrowser = () => {
  const browserLang = navigator.language || navigator.browserLanguage;

  return browserLang.startsWith("es");
};

window.onload = () => {
  const preferredLang = getCookie("lang");

  if (preferredLang && preferredLang != PAGE_LANG) {
    window.location.href = `/${preferredLang}`;
    return false;
  }
  if (!preferredLang && !isEsBrowser() && PAGE_LANG != "en") {
    window.location.href = "/en";
    return false;
  } else {
    // If we got here then we're already in the "correct" page
    const gif = busyGifs[Math.floor(Math.random() * busyGifs.length)];
    document.getElementById("busy-gif").setAttribute("src", gif);
  }
};
