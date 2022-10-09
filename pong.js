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
let posicaoYDaRaqueteOponente  = 150;
let velocidadeOponente;

let colisao = false;


function setup() {
  createCanvas(600, 400);
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
  movimentoRaqueteoponente();
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
  }
}

function movimentoRaqueteoponente(){
  velocidadeOponente = valorBolinhaNoEixoY - posicaoYDaRaqueteOponente - larguraRaquete / 2 -30;
  posicaoYDaRaqueteOponente += velocidadeOponente
}
  