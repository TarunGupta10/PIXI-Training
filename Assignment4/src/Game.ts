import {Application, Sprite,Text, Container, Loader, LoaderResource} from 'pixi.js';
import {gsap} from 'gsap';
import { sound } from '@pixi/sound';
import * as particles from "@pixi/particle-emitter";
import { Dict } from "@pixi/utils";
export class Game extends Application{
    private spin:boolean;
    private sliceAngle = 360/7;
    constructor(opts:any) {
        super(opts);
        this.preload([
            {name:'wheel', url:'assets/wheel4.png'},
            {name:'ptr', url:'assets/ptr3.png'},
            {name:'spinlogo', url:'assets/spinlogo.png'},
            { name: "coin1", url: "assets/con1.png" },
            { name: "coin2", url: "assets/con3.png" },
            { name: "coin3", url: "assets/con4.png" },
            { name: "coin4", url: "assets/con5.png" },
            { name: "coin5", url: "assets/con6.png" },
        ], this.onLoad.bind(this));
    }
    preload(list:any[], cb:()=>{}):void {
        // this.loader.onComplete.add((l: Loader) => {
        //     setResources(l.resources);
        // });
        this.loader.add(list);
        this.loader.load(cb);
    }
    winnerpage(luck:number):void{
        let arr = [200, 400, 800, 1000, 100, 500, 300]
        let results = ""
        console.log(arr[luck])
        if(luck==2 || luck==3 || luck==5){
            results="you are so lucky ❤❤🤑🤑"
        }
        else{
            results="yay... you won bonus🤑🤑"
        }
        let text = new Text("Yayyy... You have won : "+arr[luck]+"💲 from this lucky spin wheel\n"+results)
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

        const c = new Container();
    c.x = this.screen.width / 2;
    c.y = this.screen.height / 2-40;
    this.stage.addChild(c);
    const e = new particles.Emitter(c, {
      lifetime: {
        min: 0.25,
        max: 1.25,
      },
      frequency: 0.001,
      spawnChance: 1,
      particlesPerWave: 1,
      emitterLifetime: 0,
      maxParticles: 250,
      pos: {
        x: 0,
        y: 200,
      },
      addAtBack: false,
      behaviors: [
        {
          type: "alpha",
          config: {
            alpha: {
              list: [
                {
                  value: 0.3,
                  time: 0,
                },
                {
                  value: 1,
                  time: 0.2,
                },
                {
                  value: 0.8,
                  time: 1,
                },
              ],
            },
          },
        },
        {
          type: "scale",
          config: {
            scale: {
              list: [
                {
                  value: 0.001,
                  time: 0,
                },
                {
                  value: 0.1,
                  time: 0.4,
                },
                {
                  value: 0.02,
                  time: 1,
                },
              ],
            },
								"minMult": 3,
          },
        },
        {
          type: "color",
          config: {
            color: {
              list: [
                {
                  value: "fb1010",
                  time: 0,
                },
                {
                  value: "ffffff",
                  time: 0.5,
                },
                {
                  value: "f5b830",
                  time: 1,
                },
              ],
            },
          },
        },
        {
          type: "moveSpeed",
          config: {
            speed: {
              list: [
                {
                  value: 400,
                  time: 0,
                },
                {
                  value: 200,
                  time: 1,
                },
              ],
              isStepped: false,
            },
          },
        },
        {
          "type": "moveAcceleration",
          "config": {
            "accel": {
              "x": 0,
              "y": 2000
            },
            "minStart": 2000,
            "maxStart": 2000,
            "rotate": true
          }
        },
        {
          type: "rotationStatic",
          config: {
            min: 260,
            max: 280,
          },
        },
        {
          type: "spawnShape",
          config: {
            type: "torus",
            data: {
              x: 0,
              y: 0,
              radius: 20,
            },
          },
        },
        {
          type: "animatedRandom",
          config: {
            anims: [
              {
                framerate: 24,
                loop: true,
                textures: ["coin1", "coin2", "coin3", "coin4", "coin5"],
              },
              {
                framerate: 24,
                loop: true,
                textures: ["coin5", "coin4", "coin3", "coin2", "coin1"],
              },
            ],
          },
        },
      ],
    });
    e.emit = true;
    this.ticker.add((delta: number) => {
      e.update(delta * 0.01);
    });

    function setResources(resources: Dict<LoaderResource>) {
        Error("Function not implemented.");
     }

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
            sound.add("sound1","assets/sound1.mp3")
            sound.play("sound1")
            
            let random = Math.floor(Math.random()*7);
            let stopAngle = random * this.sliceAngle;
                gsap.fromTo(wheel,{angle:0},{angle:3600+stopAngle, duration:6, ease:'expo.out'});
            setTimeout(() => {
                sound.stop("sound1")
            }, 6000);
            wheel.interactive = false
            setTimeout(() => {
              c.visible=false
                wheel.visible=false
                ptr.visible = false
                this.winnerpage(random)
            }, 8000);
            
        });
    }
}