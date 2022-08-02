import kaboom from "./kaboom.js";

kaboom({
  background: [144, 149, 202],
});
loadRoot("./sprites/");

loadSprite("mario", "mario.png");
loadSprite("coin", "coin.png");
loadSprite("cloud", "cloud.png");
loadSprite("castle", "castle.png");
loadSprite("OG_Block", "OG_block.png");
loadSprite("block", "block.png");
loadSprite("normal_block", "block_new.png");
loadSprite("blue_block", "block_blue.png");
loadSprite("dino", "dino.png");
loadSprite("evil_mushroom", "evil_mushroom.png");
loadSprite("loop", "loop.png");
loadSprite("mushroom", "mushroom.png");
loadSprite("pipe_up", "pipe_up.png");
loadSprite("pipe2", "pipe2.png");
loadSprite("pipe3", "pipe3.png");
loadSprite("pipe4", "pipe4.png");
loadSprite("princes", "princes.png");
loadSprite("spongebob", "spongebob.png");
loadSprite("star", "star.png");
loadSprite("surprise", "surprise.png");
loadSprite("unboxed", "unboxed.png");

scene("win", () => {});

loadSound("jumpSound", "jumpSound.mp3");
loadSound("gameSound", "gameSound.mp3");

scene("main_lvl", () => {
  layers(["bg", "obj", "ui"], "obj");

  play("gameSound");

  const map = [
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "             ?                                                                               ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "     ?     %&%?%                                                                             ",
    "                                    *                                                        ",
    "                              *     {                                                        ",
    "                    *         {     {                                                        ",
    "                   /                                                                         ",
    "=============================================================================================",
    "=============================================================================================",
    "=============================================================================================",
    "=============================================================================================",
    "=============================================================================================",
  ];

  const MapKeys = {
    width: 20,
    height: 20,
    "=": () => [sprite("OG_Block"), solid(), area()],
    "%": () => [sprite("block"), solid(), area()],
    $: () => [sprite("coin"), area()],
    "?": () => [sprite("surprise"), solid(), area(), "surprise-coin"],
    x: () => [sprite("unboxed"), solid(), area()],
    "*": () => [sprite("pipe_up"), solid(), area()],
    "{": () => [sprite("pipe2"), solid(), area()],
    "}": () => [sprite("pipe3"), solid(), area()],
    "-": () => [sprite("pipe4"), solid(), area()],
    "/": () => [sprite("evil_mushroom"), body(), origin("bot"), area()],
    "&": () => [sprite("surprise"), solid(), area(), "surprise-mushroom"],
  };

  const gameLevel = addLevel(map, MapKeys);

  const player = add([
    sprite("mario"),
    pos(30, 0),
    body(),
    origin("bot"),
    area(),
  ]);

  onKeyDown("right", () => {
    player.move(120, 0);
  });
  onKeyDown("left", () => {
    player.move(-120, 0);
  });
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      play("jumpSound");
      player.jump(600);
    }
  });

  player.onHeadbutt((obj) => {
    if (obj.is("surprise-coin")) {
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("x", obj.gridPos);
    }
    if (obj.is("surprise-mushroom")) {
        gameLevel.spawn("&", obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn("x", obj.gridPos);
      }

  });



scene("underground_lvl", () => {
  layers(["bg", "obj", "ui"], "obj");
});

go("main_lvl");
