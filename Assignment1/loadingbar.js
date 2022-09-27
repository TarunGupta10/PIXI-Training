const game = new PIXI.Application({
  width: innerWidth,
  height: innerHeight,
  backgroundColor: 0xfdeca6,
});
document.getElementById("game").append(game.view);
loadAssets(
  [
    { name: "car1", url: "assets/car6.png" },
    { name: "car2", url: "assets/car2.png" },
    { name: "car3", url: "assets/car3.png" },
    { name: "car4", url: "assets/car1.png" },
  ],
  start
);
//------------------------------
const pBar = document.getElementById("bar");
const pText = document.getElementById("progress");
function preload(e) {
  console.log(e.progress);
  if (e.progress === 50) {
    pBar.style.backgroundColor = "black";
    pBar.style.width = e.progress + "%";
    pText.innerText = e.progress + "%";
    console.log("hello bro");
    setTimeout(() => {
      pText.innerText = e.progress + "%";
      pBar.style.width = e.progress + "%";
    }, 1000);
  }

  if (e.progress === 100) {
    console.log("hide loader");
    pBar.style.backgroundColor = "red";

    setTimeout(() => {
      pBar.style.width = e.progress + "%";
      document.getElementById("loader").style.display = "none";
    }, 2000);
  }
}
function loadAssets(list, onLoadComplete) {
  game.loader.onProgress.add(preload);
  game.loader.add(list).load(onLoadComplete);
}
function start(loader, resources) {
  const car1 = PIXI.Sprite.from(resources["car1"].texture);
  car1.scale.set(1.5);
  car1.x = 750;
  car1.y = 450;
  game.stage.addChild(car1);

  const car2 = PIXI.Sprite.from(resources["car2"].texture);
  car2.scale.set(1);
  car2.x = 600;
  car2.y = 20;
  game.stage.addChild(car2);

     const car3 = PIXI.Sprite.from(resources['car3'].texture);
     car3.scale.set(1.5);
     car3.x=200;
    car3.y=450;
    game.stage.addChild(car3);

    const car4 = PIXI.Sprite.from(resources['car4'].texture);
    car4.scale.set(1.5);
    car4.x=150;
   car4.y=20;
   game.stage.addChild(car4);

  var text = new PIXI.Text("Cars", {
    font: "50px Arial",
    fill: 0x6600cc,
    align: "center",
  });
  text.scale.set(2);

  text.x = innerWidth / 2;
  text.y = innerHeight / 2;
  text.anchor.set(0.5);
  game.stage.addChild(text);
}
