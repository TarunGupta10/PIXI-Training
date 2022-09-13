import {Application, Sprite} from 'pixi.js';
import {gsap} from 'gsap';
export class Game extends Application{
    private spin:boolean;
    private sliceAngle = 360/7;
    constructor(opts:any) {
        super(opts);
        this.preload([
            {name:'wheel', url:'assets/wheel4.png'},
            {name:'ptr', url:'assets/ptr3.png'},
            {name:'spinlogo', url:'assets/spinlogo.png'},
        ], this.onLoad.bind(this));
    }
    preload(list:any[], cb:()=>{}):void {
        this.loader.add(list);
        this.loader.load(cb);
    }
    onLoad():void {
        const wheel = new Sprite(this.loader.resources['wheel'].texture);
        wheel.scale.set(1.3)
        wheel.anchor.set(0.5);
        wheel.x = this.screen.width/2;
        wheel.y = this.screen.height/2;
        this.stage.addChild(wheel);
        wheel.interactive = true;
        wheel.buttonMode = true;
        console.log(this.stage);

        const ptr = new Sprite(this.loader.resources['ptr'].texture);
        ptr.scale.set(0.7)
        ptr.anchor.set(0.5);
        ptr.x = this.screen.width/2;
        ptr.y = this.screen.height/2 - 193;
        this.stage.addChild(ptr);

        const spinlogo = new Sprite(this.loader.resources['spinlogo'].texture);
        // spinlogo.scale.set(1)
        // spinlogo.anchor.set(0.5);
        spinlogo.x = 10;
        spinlogo.y = 10;
        this.stage.addChild(spinlogo);

        wheel.on('pointerup', ()=>{
            let random = Math.floor(Math.random()*7);
            let stopAngle = random * this.sliceAngle;
            gsap.fromTo(wheel,{angle:0},{angle:3600+stopAngle, duration:5, ease:'expo.out'});
        });
    }
}