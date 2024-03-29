const game = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0xabdbe3,
  });
  
  document.getElementById("game").append(game.view);
  
  loadAssets(
    [
      { name: "logo", url: "/assets/icons8-cards-100.png" },
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
  
    const logo = PIXI.Sprite.from(resources["logo"].texture);
    logo.scale.set(0.5);
    logo.x = 40;
    logo.y = 20;
    game.stage.addChild(logo);
  
    var d = 180;
    var s=0;
    for (var i = 0; i < 2; i++) {
      for(var j=0;j<6;j++){
      const back = PIXI.Sprite.from(resources["back"].texture);
      back.scale.set(0.12);
      back.x = d;
      back.y = 160+s;
      game.stage.addChild(back);
      d = d + 200;
    }
    s+=200; 
    d=180;          
  }
    var x = 0;
    var y = 0;
    var e = 180;
    var s=0;
    for (var i = 0; i < 2; i++) {
      for(var j= 0;j<6;j++){
      const card = new PIXI.Texture(
        resources["front"].texture,
        new PIXI.Rectangle(x, y, 125, 181)
      );
      const front = PIXI.Sprite.from(card);
      front.scale.set(1);
      front.x = e;
      front.y = 160+s;
      game.stage.addChild(front);
      e = e + 200;
      x += 125;
      // y += 181;
    }
    s+=200;
    e=180;
  }


    // var d = 70;
    // for (var i = 0; i < 8; i++) {
    //   const back = PIXI.Sprite.from(resources["back"].texture);
    //   back.scale.set(0.12);
    //   back.x = d;
    //   back.y = 390;
    //   game.stage.addChild(back);
    //   d = d + 180;
    // }
    
    // var x = 2;
    // var y = 2;
    // var e = 70;
    // for (var i = 0; i < 8; i++) {
    //   const card = new PIXI.Texture(
    //     resources["front"].texture,
    //     new PIXI.Rectangle(x, y, 127, 183)
    //   );
    //   const front = PIXI.Sprite.from(card);
    //   front.scale.set(1);
    //   front.x = e;
    //   front.y = 390;
    //   game.stage.addChild(front);
    //   e = e + 180;
    //   x += 125;
    //   // y += 181;
    // }
  }
  