// import { Sprite } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.2/browser/pixi.mjs";
import { Application } from 'pixi.js';
import { Game } from './Game';
import './css/main.css';

/***
 * the following used to be a hack to register the spine plugin not sure if it is still needed.
 */
//  import {SpineParser} from '@pixi-spine/loader-3.8';
//  export {SpineParser};
//  export * from '@pixi-spine/runtime-3.8';
//  export * from '@pixi-spine/base';
//  SpineParser.registerLoaderPlugin();
 ///;
window.onload = ()=>{
    const gameDiv:HTMLDivElement = <HTMLDivElement>document.getElementById('game');
    const app:Application = new Game({
        // resizeTo: gameDiv,
        width : innerWidth,
        height : innerHeight,
        // backgroundColor: 0xADB7FF,
        sharedLoader: true,
        sharedTicker: true
    });
        gameDiv.appendChild(app.view);
   
}
