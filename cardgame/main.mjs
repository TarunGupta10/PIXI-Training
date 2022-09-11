import {Application } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.2/browser/pixi.mjs";
import { start, Start} from "./js/game.mjs";
import { loadAssets } from "./js/loader.mjs";

export function createGame(div) {
    const game = new Application({
        width:innerWidth,
        height:innerHeight,
        backgroundColor:0xE2A76F ,
        resizeTo: div
    });
    console.log('game', game);
    div.appendChild(game.view);
    return game;
}

const game = createGame(document.getElementById('game'));
loadAssets(game,[
    { name: "back", url: "assets/pkbk4.jpg" },
    { name: "front", url: "assets/pk.jpg" },
  ], () => {
    console.log('starting game');
    Start(game);
  });