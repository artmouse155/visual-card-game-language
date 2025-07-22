import { Blackjack } from "./src/blackjack.ts";

import pkg from "electron";
const { app, BrowserWindow } = pkg;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

const game = new Blackjack();
game.play();
