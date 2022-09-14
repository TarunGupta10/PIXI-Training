import { Application, Loader, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { getResource, setResources } from "./Texture.utils";
import { Spine } from "pixi-spine";
export class Game extends Application {
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "goblin", url: "assets/goblins/goblins.json" },
        { name: "boy", url: "assets/spineboy/spineboy.json" },
        { name: "hero", url: "assets/hero/hero.json" },
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

    const gob = new Spine(getResource("goblin").spineData);
    gob.skeleton.setSkinByName("goblin");
    gob.skeleton.setSlotsToSetupPose();
    gob.state.setAnimation(0, "walk", true);
    gob.x = this.screen.width / 2 + 250;
    gob.y = this.screen.height - 50;
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
    spineboy.x = this.screen.width / 2 - 250;
    spineboy.y = this.screen.height - 50;
    spineboy.scale.set(0.5);
    spineboy.skeleton.setSlotsToSetupPose();
    spineboy.stateData.setMix("walk", "jump", 0.2);
    spineboy.stateData.setMix("jump", "walk", 0.4);
    spineboy.stateData.setMix("idle", "jump", 0.2);
    spineboy.stateData.setMix("jump", "idle", 0.5);
    spineboy.state.setAnimation(0, "idle", true);
    this.stage.addChild(spineboy);
    let previousAnim: string = "idle";
    let currentAnim: string = "idle";
    let revertToAnim: string = "idle";
    let direction: number = 1;
    let defaultScale = spineboy.scale.x;
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
            case "KeyW":
              currentAnim = "jump";
              break;
            case "KeyX":
              currentAnim = "death";
              break;
              case "KeyH":
                currentAnim = "hit";
                break;
                case "KeyR":
                currentAnim = "run";
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
