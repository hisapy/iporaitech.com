import "./styles.css";

const img = document.getElementById("busy-gif");

const busyGifs = [
  "https://media.giphy.com/media/q6RoNkLlFNjaw/giphy.gif",
  "https://media.giphy.com/media/25L8qEAZO20LK/giphy.gif",
  "https://media.giphy.com/media/DZR39sOOQWP8A7UoVs/giphy.gif",
  "https://media.giphy.com/media/11JTxkrmq4bGE0/giphy.gif"
];

const gif = busyGifs[Math.floor(Math.random() * busyGifs.length)];

img.setAttribute("src", gif);
