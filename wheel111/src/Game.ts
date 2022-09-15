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
        ], this.onLoad.bind(this));
    }
    preload(list:any[], cb:()=>{}):void {
        this.loader.add(list);
        this.loader.load(cb);
    }
    winnerpage(num:number):void{
        let arr = [200, 400, 800, 1000, 100, 500, 300]
      
        let text = new Text("Yayyy... You have won : "+arr[num]+" from this numy spin wheel")
        text.x = innerWidth/2
        text.y = innerHeight/2 + 250
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

       

        wheel.on('pointerup', ()=>{
           
            
            let random = Math.floor(Math.random()*7);
            let stopAngle = random * this.sliceAngle;
                gsap.fromTo(wheel,{angle:0},{angle:3600+stopAngle, duration:6, ease:'expo.out'});
           
           
            setTimeout(() => {
                wheel.visible=true
                ptr.visible = true
               
                this.winnerpage(random)
            }, 7000);
            
        });
    }
}