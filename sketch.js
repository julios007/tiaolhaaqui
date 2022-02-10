//Criando Variáveis
var cloud,cloudA;
var trex, trex_running;
var edges;
var ground, groundImage;
var chaoinv;
var cacto6,cacto1,cacto2,cacto3,cacto4,cacto5;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
//Pré-carregamento de imagens para criar uma animação em sprites
function preload() {
  //variável auxiliar trex_running recebendo as imagens 
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
 cloudA = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");

}

//Configuração
function setup() {
  //Criando a área do jogo
  createCanvas(600, 200);
  chaoinv = createSprite(200,190,400,10);
 chaoinv.visible = false;
  cactosgtros =new Group();
  nuvensg = new Group();
 
 
 trex = createSprite(50, 160, 20, 50);
  //adicionando animação na var oficial com o rótulo running
  trex.addAnimation("running", trex_running);
  //Escala
  trex.scale = 0.5;

  //Criando as bordas para a área do jogo
  edges = createEdgeSprites();

  //Criando o solo
  //Sprite do solo
  ground = createSprite(200, 180, 400, 20);
  //adicionando uma imagem para o chão na var oficial 
  ground.addImage("ground", groundImage);
  //dividindo o tamando do chão por 2 para ele recarregar 

 //var test = Math.round (random(1,100));
 //console.log (test);
}


function draw() {
  background("white");
text("tempo: "+score,500,50);
  //colocando velocidade no chão

if(gamestate === PLAY){
  ground.velocityX = -10;
  score =score+Math.round(frameCount/60);
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }


  if (keyDown("space") && trex.y >= 150) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;


  cactos();
  criarNuvens();
  if(cactosgtros.isTouching(trex)){
    gamestate = END;
  }
else if(gamestate === END){
ground.velocityX = 0;
cactosgtros.setVelocityXEach(0);
nuvensg.setVelocityXEach(0);

}

  


  trex.collide(chaoinv);

  drawSprites();
}
}

function cactos(){
  if (frameCount%120 === 0){
  var cacto = createSprite (610,165,10,40);
  cacto.velocityX = -10;
  var cactros = Math.round (random(1,6));

  switch(cactros){
  case 1: cacto.addImage(cacto1);
  break;
case 2: cacto.addImage(cacto2);
  break;
case 3: cacto.addImage(cacto3);
break;
case 4: cacto.addImage(cacto4);
  break;
case 5: cacto.addImage(cacto5);
  break;
case 6: cacto.addImage(cacto6);
  break;
default: break;
}
cacto.scale = 0.5;
cacto.lifetime = 150;
cactosgtros.add (cacto);
}
}

function criarNuvens(){
if (frameCount%60 === 0){
  cloud = createSprite(610,100,10,10);
cloud.y =Math.round(random(50,100));
cloud.velocityX = -4;
cloud.addImage("nuvem", cloudA);
cloud.scale= 0.5;
cloud.depth= trex.depth;
trex.depth = trex.depth +1;

console.log (cloud.depth);
console.log (trex.depth);
cloud.lifetime = 150;
nuvensg.add (cloud);
}
}
