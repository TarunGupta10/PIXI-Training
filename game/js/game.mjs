import { Sprite, Texture, Rectangle, Text } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.2/browser/pixi.mjs";
import { FRAMES, getCard, HEIGHT, shuffle, WIDTH } from "./card.mjs";
import { getTextureById } from "./loader.mjs";
export function Start(game){
  const sprite  = Sprite.from("assets/pkwl8.png")
  sprite.width = innerWidth
  sprite.height = innerHeight
  game.stage.addChild(sprite)

  const sprite1  = Sprite.from("assets/play.png")
  sprite1.buttonMode = true
  sprite1.interactive = true
  sprite1.x = innerWidth/2 - 530
  sprite1.y = innerHeight/2
  sprite1.anchor.set(0.5)  
  sprite1.scale.set(0.2)
  game.stage.addChild(sprite1)
  sprite1.on("pointerup", ()=>{
    sprite1.visible = false
    sprite1.interactive = false
    sprite.visible = false
    start(game)
  })

}

let cards;
let firstChoice;
let secondChoice;
export function start(app) {
  const sprite4 = Sprite.from("assets/pkwl9.jpg")
  sprite4.width = innerWidth
  sprite4.height = innerHeight
  app.stage.addChild(sprite4)

  const sprite3 = Sprite.from("assets/pki128.png")
  sprite3.scale.set(0.7)
  sprite3.x = 20
  sprite3.y = 20
  app.stage.addChild(sprite3)

  const { stage } = app;
  cards = drawCards(stage);
  stage.interactive = true;
  stage.on("pointerup", () => {
    if(cards.length == 0){
        stage.removeChildren();
        start(app);
    } else if (firstChoice === undefined) {
      firstChoice = cards.filter((v) => v.isOpen())[0];
      console.log("firstChoice", firstChoice);
      secondChoice[0]
    } else {
      stage.interactiveChildren = false;
      secondChoice = cards.filter((v) => v.isOpen());
      if(secondChoice[1] === undefined){
        cards.forEach((c) => {
          c.reset();  
    })
        firstChoice = undefined;
        secondChoice = undefined;
        stage.interactiveChildren = true;  
    }
      if (secondChoice[0].id === secondChoice[1].id) {
        setTimeout(() => {
          stage.removeChild(secondChoice[0].view);
          stage.removeChild(secondChoice[1].view);
          cards = cards.filter((c) => !c.isOpen());
          if (cards.length === 0) {
            let finalMessage = new Text('Wohoo...🎉🎊\nYou cleared all cards\nClick To Continue.', {fill : 0x5CFC00});
            // finalMessage.set.color = 0xFFFFFF;
            finalMessage.anchor.set(0.5);
            finalMessage.x = app.screen.width/2;
            finalMessage.y = app.screen.height/2;
            stage.addChild(finalMessage);
            const sprite5 = Sprite.from("assets/start.png")
            sprite5.anchor.set(0.5);
            sprite5.x = app.screen.width/2;
            sprite5.y = app.screen.height/2 + 100;
            sprite5.scale.set(0.2)
            app.stage.addChild(sprite5)

          }
          firstChoice = undefined;
          secondChoice = undefined;
          stage.interactiveChildren = true;
        }, 1000);
      } else {
        setTimeout(()=>{
        cards.forEach((c) => {
          c.reset();
        });
        firstChoice = undefined;
        secondChoice = undefined;
        stage.interactiveChildren = true;
    }, 500);
      }
    }
  });
}

function drawCards(stage) {
  let cardNum = 0;
  const cards = [];
  const offsetX = 250;
  const offsetXY = 50;
  const paddingX = 10;
  const paddingY = 10;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      for (let c = 0; c < 2; c++) {
        const card = getCard(cardNum, new Rectangle(...FRAMES[cardNum]));
        stage.addChild(card.view);
        cards.push(card);
      }
      cardNum++;
    }
  }
  shuffle(cards);
  let count = 0;
  for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 4; r++) {
      let card = cards[count];
      card.view.x = c * (WIDTH + paddingX) + offsetX;
      card.view.y = r * (HEIGHT + paddingY) + offsetXY;
      count++;
    }
  }
  return cards;
}