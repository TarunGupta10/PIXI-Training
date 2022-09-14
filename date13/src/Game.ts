import {Application, Sprite,Text} from 'pixi.js';
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
    winnerpage(luck:number):void{
        let arr = [200, 400, 800, 1000, 100, 500, 300]
        let results = ""
        console.log(arr[luck])
        if(luck==2 || luck==3 || luck==5){
            results="you are so lucky"
        }
        else{
            results="yay... you won bonus"
        }
        let text = new Text("Yayyy... You have won : "+arr[luck]+"$ from this lucky spin wheel\n"+results)
        text.x = innerWidth/2
        text.y = innerHeight/2
        text.anchor.set(0.5);
        this.stage.addChild(text)
        setTimeout(() => {
            text.visible = false
            this.onLoad()
        }, 3000);
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
        spinlogo.x = 10;
        spinlogo.y = 10;
        this.stage.addChild(spinlogo);

        wheel.on('pointerup', ()=>{
            let random = Math.floor(Math.random()*7);
            let stopAngle = random * this.sliceAngle;
                gsap.fromTo(wheel,{angle:0},{angle:3600+stopAngle, duration:5, ease:'expo.out'});

            wheel.interactive = false
            setTimeout(() => {
                wheel.visible=false
                ptr.visible = false
                this.winnerpage(random)
            }, 7000);
            
        });
    }
}