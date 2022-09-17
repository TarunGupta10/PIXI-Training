import { AnimatedSprite, Application, Container, Sprite } from "./lib/pixi.mjs";
import { assets, getDinoTextures, getSSAnimTextures,getKenAnimTextures, preload } from "./Preloader.mjs";



export class Game extends Application {
    constructor(options) {
        super(options);
        this.background = new Container();
        this.animations = new Container();
        this.stage.addChild(this.background);
        this.stage.addChild(this.animations);

        preload(assets, this.onLoadComplete.bind(this));
    //     const bg  = Sprite.from("assets/bggg.jpg")
    // bg.width = innerWidth
    // bg.height = innerHeight
    // this.stage.addChild(bg)
    }
    

    onLoadComplete() {
        console.log('loading complete');
        const goku = new AnimatedSprite(getSSAnimTextures('goku-ss', 'punch'));
        goku.animationSpeed = 0.125;
        goku.x = 200
        goku.y = 200
        goku.play();
        goku.scale.set(3)
        this.animations.addChild(goku);

        const ken = new AnimatedSprite(getKenAnimTextures('ken', 'fire'));
        ken.animationSpeed = 0.125;
        ken.x = 600
        ken.y = 200
        ken.scale.set(3)
        ken.play();
        this.animations.addChild(ken);

        const dino = new AnimatedSprite(getDinoTextures('dino', 'walk'));
        dino.play();
        dino.animationSpeed = 0.125;
        dino.x = 900
        dino.y = 200
        // dino.anchor.y = 1;
        // dino.y = this.screen.height;
        dino.scale.set(0.5)
        this.animations.addChild(dino);

        
    }
}