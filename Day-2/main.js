const game = new PIXI.Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0xabdbe3,
});

document.getElementById("game").append(game.view);

loadAssets([
    { name:"back", url:"/assets/cardback.png"},
    { name:"front", url:"/assets/spade3.svg"},
], start)

// -------------------------------
const pBar = document.getElementById("bar");
const pText = document.getElementById("progress");
function preload(e) {
  pBar.style.width = e.progress * 2 + "%";
  pText.innerText = e.progress + "%";
  if(e.progress === 100){
    console.log('hide loader');
    setTimeout(() => {
        document.getElementById("loader").style.display = 'none'
    }, 500);  
  }
  console.log(e.progress);
}

function loadAssets(list, onLoadComplete) {
  game.loader.onProgress.add(preload);
  game.loader.add(list).load(onLoadComplete);
}


function start(loader, resources) {
  console.log('params ', arguments);
  const back = PIXI.Sprite.from(resources['back'].texture);
  back.scale.set(0.12);
  game.stage.addChild(back);

  // const smily = new PIXI.Texture(resources['front'].texture,
  // new PIXI.Rectangle(4,4,151,151));
  const front = PIXI.Sprite.from(resources['front'].texture);
  front.scale.set(1.1);
  game.stage.addChild(front);
}
