const game = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0xE06910,
  });
  
  document.getElementById("game").append(game.view);
  
  loadAssets(
    [
      { name: "back", url: "/assets/cardback.png" },
      { name: "front", url: "/assets/carddeck.png" },
    ],
    start
  );
  
  // -------------------------------
  const pBar = document.getElementById("bar");
  const pText = document.getElementById("progress");
  function preload(e) {
    pBar.style.width = e.progress * 2 + "%";
    pText.innerText = e.progress + "%";
    if (e.progress === 100) {
      console.log("hide loader");
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 500);
    }
    console.log(e.progress);
  }
  
  function loadAssets(list, onLoadComplete) {
    game.loader.onProgress.add(preload);
    game.loader.add(list).load(onLoadComplete);
  }
  
  function start(loader, resources) {
    console.log("params ", arguments);
  
    var d = 80;
    for (var i = 0; i < 5; i++) {
      const back = PIXI.Sprite.from(resources["back"].texture);
      back.scale.set(0.12);
      back.x = d;
      back.y = 100;
      game.stage.addChild(back);
      d = d + 300;
    }
    var x = 0;
    var y = 0;
    var e = 80;
    for (var i = 0; i < 5; i++) {
      const card = new PIXI.Texture(
        resources["front"].texture,
        new PIXI.Rectangle(0, 0, 125, 181)
      );
      const front = PIXI.Sprite.from(card);
      front.scale.set(1);
      front.x = e;
      front.y = 100;
      game.stage.addChild(front);
      e = e + 300;
      x += 125;
      y += 181;
    }
    var d = 80;
    for (var i = 0; i < 5; i++) {
      const back = PIXI.Sprite.from(resources["back"].texture);
      back.scale.set(0.12);
      back.x = d;
      back.y = 360;
      game.stage.addChild(back);
      d = d + 300;
    }
    var x = 0;
    var y = 0;
    var e = 80;
    for (var i = 0; i < 5; i++) {
      const card = new PIXI.Texture(
        resources["front"].texture,
        new PIXI.Rectangle(0, 0, 125, 181)
      );
      const front = PIXI.Sprite.from(card);
      front.scale.set(1);
      front.x = e;
      front.y = 360;
      game.stage.addChild(front);
      e = e + 300;
      x += 125;
      y += 181;
    }
  }
  