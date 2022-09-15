import { Application, Loader, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { getResource, setResources } from "./Texture.utils";
import { sound } from "@pixi/sound";
import { Spine } from "pixi-spine";
export class Game extends Application {
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "goblin", url: "assets/goblins/goblins-pro.json" },
        { name: "boy", url: "assets/spineboy/spineboy-pro.json" },
        { name: "hero", url: "assets/hero/hero-pro.json" },
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
    this.stage.interactive = true;

    const bg = Sprite.from("assets/bg.png");
    bg.width = innerWidth;
    bg.height = innerHeight;
    this.stage.addChild(bg);

    const hero = new Spine(getResource("hero").spineData);
    // hero.skeleton.setSkinByName("goblin");
    hero.skeleton.setSlotsToSetupPose();
    hero.state.setAnimation(0, "walk", true);
    hero.x = this.screen.width / 2 - 450;
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
    gob.x = this.screen.width / 2 + 400;
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
    spineboy.x = this.screen.width / 2;
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
    spineboy.state.setAnimation(0, "idle", true);
    this.stage.addChild(spineboy);
    let previousAnim: string = "idle";
    let currentAnim: string = "idle";
    let revertToAnim: string = "idle";
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
                case "KeyD":
              currentAnim1 = "idle";
              revertToAnim1 = "idle";
              direction1 = 1;
              break;
              case "KeyJ":
              currentAnim1 = "walk";
              revertToAnim1 = "walk";
              direction1 = -1;
              break;

            default:
              currentAnim = "idle";
              revertToAnim = "idle";
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
