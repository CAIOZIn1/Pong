//variáveis da bolinha
let valorBolinhaNoEixoX = 220;
let valorBolinhaNoEixoY = 250;
const diametro = 30;
const raio = diametro / 2;

//velocidade da bolinha
let velocidadeBolinhaX = 6;
let velocidadeBolinhaY = 6;

//variáveis minha raquete
const posicaoXDaRaquete = 6;
let posicaoYDaRaquete  = 150;

//variáveis da raquete
const larguraRaquete = 5;
const comprimentoRaquete =105;
const bordaDaRaquete = 5;

//variáveis das raquetes do Oponente
const posicaoXDaRaqueteOponente = 588;
let posicaoYDaRaqueteOponente  = 200;
let velocidadeOponente;

let colisao = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variáveis sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar; - teste
let chanceDeErrar = 0;

function preload () {
  trilha = loadSound('trilha.mp3')
  ponto = loadSound('ponto.mp3')
  raquetada = loadSound('raquetada.mp3')
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(posicaoXDaRaquete, posicaoYDaRaquete);
  mostraRaquete(posicaoXDaRaqueteOponente, posicaoYDaRaqueteOponente);
  movimentoMinhaRaquete();
  verificaColisaoRaqueteBiblioteca(posicaoXDaRaquete, posicaoYDaRaquete);
  verificaColisaoRaqueteBiblioteca(posicaoXDaRaqueteOponente, posicaoYDaRaqueteOponente);
  movimentoRaqueteOponente();
  contabilizaPontos();
  incluiPlacar();
}

function mostraBolinha () {
  circle(valorBolinhaNoEixoX,valorBolinhaNoEixoY,
        diametro);
}

function movimentaBolinha () {
  valorBolinhaNoEixoX += velocidadeBolinhaX;
  valorBolinhaNoEixoY += velocidadeBolinhaY;
}

function verificaColisaoBorda () {
  if (valorBolinhaNoEixoX + raio > width || valorBolinhaNoEixoX - raio < 0 ){
    velocidadeBolinhaX *= -1;
  }
  
  if (valorBolinhaNoEixoY + raio > height || valorBolinhaNoEixoY - raio < 0 ) {
    velocidadeBolinhaY *= -1;
  }
}

function mostraRaquete (x, y) {
  rect(x, y, larguraRaquete, comprimentoRaquete, bordaDaRaquete, bordaDaRaquete);
}

function movimentoMinhaRaquete () {
  if (keyIsDown(UP_ARROW) ){
    posicaoYDaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
      posicaoYDaRaquete += 10;
  }
  
  if (posicaoYDaRaquete > height){
      posicaoYDaRaquete -= 500;
  }
  
  if (posicaoYDaRaquete < -100){
      posicaoYDaRaquete += 500;
  }
}

function verificaColisaoRaqueteBiblioteca(x, y){
  colisao = collideRectCircle(x, y, larguraRaquete, comprimentoRaquete,valorBolinhaNoEixoX, valorBolinhaNoEixoY, diametro);
  
  if (colisao) {
    velocidadeBolinhaX *= -1;
    raquetada.play()
  }
}

function movimentoRaqueteOponente(){
  
  //MULTIPLAYER:
  
  /*
  if (keyIsDown(87) ){
    posicaoYDaRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
      posicaoYDaRaqueteOponente += 10;
  }
  
  if (posicaoYDaRaqueteOponente > height){
      posicaoYDaRaqueteOponente -= 500;
  }
  
  if (posicaoYDaRaqueteOponente < -100){
      posicaoYDaRaqueteOponente += 500;
  }
  */
  
  //bot
  
  velocidadeOponente = valorBolinhaNoEixoY - posicaoYDaRaqueteOponente - larguraRaquete / 2 -30;
  posicaoYDaRaqueteOponente += velocidadeOponente;
  //posicaoYDaRaqueteOponente += velocidadeOponente + chanceDeErrar
  //calculaChanceDeErrar()
}

function incluiPlacar (){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(250, 140,0))
  rect(150, 10, 40, 20)
  fill(225);
  text(meusPontos, 170, 26);
  fill(color(250, 140,0))
  rect(450, 10, 40, 20)
  fill(225);
  text(pontosOponente, 470, 26);
}

function contabilizaPontos () {
  if (valorBolinhaNoEixoX + raio >= 598) {
      meusPontos += 1;
      ponto.play()
      }
  
  if (valorBolinhaNoEixoX - raio <= 0 ) {
      pontosOponente += 1;
      ponto.play()
      }
}

/*
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
*/