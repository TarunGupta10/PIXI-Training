import { Application, Loader, Sprite, Text } from "pixi.js";
import { gsap } from "gsap";
import { getResource, setResources } from "./Texture.utils";
import { sound } from "@pixi/sound";
import { Spine } from "pixi-spine";


export class Game extends Application {
  visible: boolean;
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "goblin", url: "assets/goblins/goblins-pro.json" },
        { name: "boy", url: "assets/spineboy/spineboy-pro.json" },
        { name: "hero", url: "assets/hero/hero-pro.json" },
        { name: "sboy", url: "assets/pixi-spine/spineboy.json" },
        // { name: "bg", url: "assets/bg.png" },
      ],
      this.onLoad.bind(this)
    );
  }
  preload(list: any[], cb: () => {}): void {
    this.loader.onComplete.add((l: Loader) => {
      setResources(l.resources);
    });
    this.loader.add(list);
    this.loader.load(cb);
  }

  
  onLoad(): void {
    let postition = 0;
    this.stage.interactive = true;


    const bg = Sprite.from("assets/bg.png");
    bg.width = innerWidth;
    bg.height = innerHeight;
    this.stage.addChild(bg);

    
  //   const bg = Sprite.from("assets/bg.png");
  //   bg.width = innerWidth;
  //   bg.height = innerHeight;
  //   this.stage.addChild(bg);
  //   const bg2 = Sprite.from("assets/bg.png");
  //   bg2.width = innerWidth;
  //   bg2.height = innerHeight;
  //   this.stage.addChild(bg2);
  //   const bg3 = Sprite.from("assets/bg.png");
  //   bg3.width = innerWidth;
  //   bg3.height = innerHeight;
  //   this.stage.addChild(bg3);

  //   this.ticker.add(() => {
  //     postition += 10;
  //     bg.x = -(postition * 0.6);
  //     bg.x %= 1286;
  //     if (bg.x < 0) {
  //         bg.x += 1286;
  //     }
  //     bg.x -= 0;

  //     bg2.x = -(postition * 0.6) + 1286;
  //     bg2.x %= 1286 * 2;
  //     if (bg2.x < 0) {
  //         bg2.x += 1286 * 2;
  //     }
  //     bg2.x -= 1286;

  //     bg3.x = -(postition * 0.6) + 2572;
  //     bg3.x %= 1286 * 2;
  //     if (bg3.x < 0) {
  //         bg3.x += 1286 * 2;
  //     }
  //     bg3.x -= 1286;
  // });

    const sboy = new Spine(getResource("sboy").spineData);
// sboy.skeleton.setSkinByName("goblin");
sboy.skeleton.setSlotsToSetupPose();
sboy.stateData.setMix("walk", "jump", 0.2);
sboy.stateData.setMix("jump", "walk", 0.2);
sboy.state.setAnimation(0, "walk", true);
sboy.x = 150;
sboy.y = this.screen.height - 100;
sboy.scale.set(1);
this.stage.addChild(sboy);
let previousAnim2: string = "walk";
let currentAnim2: string = "walk";
let revertToAnim2: string = "walk";
let direction2: number = -1;
var defaultScale = sboy.scale.x;
this.ticker.add(() => {
  // sboy.scale.x = defaultScale * direction2;
  if (currentAnim2 != previousAnim2) {
    console.log(currentAnim2, previousAnim2);
    sboy.state.setAnimation(0, currentAnim2, true);
    previousAnim2 = currentAnim2;
  }
});
    const hero = new Spine(getResource("hero").spineData);
    // hero.skeleton.setSkinByName("goblin");
    hero.skeleton.setSlotsToSetupPose();
    hero.stateData.setMix("run", "attack", 0.2);
    hero.stateData.setMix("attack", "run", 0.2);
    hero.stateData.setMix("idle", "run", 0.2);
    hero.stateData.setMix("run", "idle", 0.3);
    hero.stateData.setMix("walk", "run", 0.4);
    hero.stateData.setMix("run", "walk", 0.2);
    hero.stateData.setMix("idle", "walk", 0.2);
    hero.stateData.setMix("walk", "idle", 0.5);
    hero.state.setAnimation(0, "walk", true);
    hero.x = this.screen.width / 2 - 300;
    hero.y = this.screen.height - 100;
    hero.scale.set(1);
    this.stage.addChild(hero);
    let previousAnim1: string = "walk";
    let currentAnim1: string = "walk";
    let revertToAnim1: string = "walk";
    let direction1: number = -1;
    var defaultScale = hero.scale.x;
    this.ticker.add(() => {
      // hero.scale.x = defaultScale * direction1;
      if (currentAnim1 != previousAnim1) {
        console.log(currentAnim1, previousAnim1);
        hero.state.setAnimation(0, currentAnim1, true);
        previousAnim1 = currentAnim1;
      }
    });

    const gob = new Spine(getResource("goblin").spineData);
    gob.skeleton.setSkinByName("goblin");
    gob.skeleton.setSlotsToSetupPose();
    gob.state.setAnimation(0, "walk", true);
    gob.x = this.screen.width / 2 + 550;
    gob.y = this.screen.height - 100;
    this.stage.addChild(gob);

    this.stage.on("pointertap", () => {
      // change current skin
      const currentSkinName = gob.skeleton.skin.name;
      const newSkinName =
        currentSkinName === "goblin" ? "goblingirl" : "goblin";
      gob.skeleton.setSkinByName(newSkinName);
      gob.skeleton.setSlotsToSetupPose();
    });

    const spineboy = new Spine(getResource("boy").spineData);
    spineboy.x = this.screen.width / 2 + 200;
    spineboy.y = this.screen.height - 80;
    spineboy.scale.set(0.5);
    spineboy.skeleton.setSlotsToSetupPose();
    spineboy.stateData.setMix("walk", "jump", 0.2);
    spineboy.stateData.setMix("jump", "walk", 0.4);
    spineboy.stateData.setMix("idle", "jump", 0.2);
    spineboy.stateData.setMix("jump", "idle", 0.5);
    spineboy.stateData.setMix("run", "idle", 0.4);
    spineboy.stateData.setMix("idle", "run", 0.2);
    spineboy.stateData.setMix("idle", "shoot", 0.2);
    spineboy.stateData.setMix("shoot", "idle", 0.5);
    spineboy.stateData.setMix("run", "shoot", 0.2);
    spineboy.stateData.setMix("shoot", "run", 0.5);
    spineboy.stateData.setMix("run", "death", 0.4);
    spineboy.stateData.setMix("death", "run", 0.4);
    spineboy.stateData.setMix("idle", "death", 0.4);
    spineboy.stateData.setMix("death", "idle", 0.3);
    spineboy.state.setAnimation(0, "hoverboard", true);
    this.stage.addChild(spineboy);
    let previousAnim: string = "hoverboard";
    let currentAnim: string = "hoverboard";
    let revertToAnim: string = "hoverboard";
    let direction: number = 1;
    var defaultScale = spineboy.scale.x;
    this.ticker.add(() => {
      spineboy.scale.x = defaultScale * direction;
      if (currentAnim != previousAnim) {
        console.log(currentAnim, previousAnim);
        spineboy.state.setAnimation(0, currentAnim, true);
        previousAnim = currentAnim;
      }
    });
    function onKeyEvent(e: KeyboardEvent): void {
      console.log("keyboard event", e);
      switch (e.type) {
        case "keyup":
          switch (e.code) {
            default:
              currentAnim = revertToAnim;
              // direction = 1;
              break;
          }
          break;
        case "keydown":
          switch (e.code) {
            // spine boy
            case "KeyW":
              currentAnim = "jump";
              revertToAnim="idle"
              break;
            case "KeyX":
              currentAnim = "death";
              revertToAnim = "death";
              break;
            case "KeyR":
              currentAnim = "run";
              revertToAnim = "run";
              break;
            case "KeyF":
              currentAnim = "hoverboard";
              revertToAnim = "hoverboard";
              break;
            case "KeyS":
              currentAnim = "portal";
              revertToAnim = "walk";
              // sound.add("sound2", "assets/portal.mp3");
              // sound.play("sound2");
              break;
            case "KeyE":
              currentAnim = "aim";
              revertToAnim = "idle";
              break;
            case "KeyD":
              currentAnim = "walk";
              revertToAnim = "walk";
              direction = 1;
              break;
            case "KeyA":
              currentAnim = "walk";
              revertToAnim = "walk";
              direction = -1;
              break;
            case "Space":
              currentAnim = "shoot";
              revertToAnim = "idle";
              sound.add("sound1", "assets/blaster1.mp3");
              sound.play("sound1");
              break;

               //Hero
        case "KeyU":
          currentAnim1 = "crouch";
          revertToAnim1 = "idle";
          break;
        case "KeyI":
          currentAnim1 = "run";
          revertToAnim1 = "run";
          break;
          case "KeyK":
              currentAnim1 = "head-turn";
              revertToAnim1 = "head-turn";
              break;
              case "KeyL":
                currentAnim1 = "attack";
                break;
                case "KeyO":
              currentAnim1 = "idle";
              revertToAnim1 = "idle";
              direction1 = 1;
              break;
              case "KeyJ":
              currentAnim1 = "walk";
              revertToAnim1 = "walk";
              direction1 = -1;
              break;


              // sboy
              case "KeyV":
                currentAnim2 = "jump";
                break;
                case "KeyB":
                currentAnim2 = "walk";
                break;

            default:
              currentAnim = "hoverboard";
              revertToAnim = "hoverboard";
          }
          break;
        default:
          console.warn("Event has no listener", e.type);
      }
    }

    
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
  }
}

