const game = new PIXI.Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0xabdbe3,
});

document.getElementById("game").append(game.view);

loadAssets([
    { name:"back", url:"/assets/cardback.png"},
    { name:"front", url:"/assets/carddeck.png"},
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
  var d = 80
  for(var i=0;i<4;i++){
  const back = PIXI.Sprite.from(resources['back'].texture);
  back.scale.set(0.12);
  back.x = d
  back.y = 30
  game.stage.addChild(back);
  d=d+400
  }
  let x = 0
  let y = 0
  var e=80
  for(var i=0;i<4;i++){
  const card = new PIXI.Texture(resources['front'].texture,
  new PIXI.Rectangle(0,0,125,181));
  const front = PIXI.Sprite.from(card);
  front.scale.set(1);
  front.style.display = "none"
  front.x = e
  front.y = 30
  game.stage.addChild(front);
  e=e+400
  x+=125
  y+=181
  }
}
