/**
 * Created by Raquel on 27-03-2017.
 */




var divQuiz = document.getElementById("quiz");
var divCanvas = document.getElementById("game");
var btnRollDice = document.getElementById("btnRollDice");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var nDice = 0;
var idPlayer = 0;
var canMove = false;
var nomeJogador1 = document.getElementById('jogador1').value;
var nomeJogador2 = document.getElementById('jogador2').value;
var jogador1, jogador2;
//Jogador da rodada
var jogadorAtual;

function initGame() {

    jogador1 = new Jogador(nomeJogador1);
    jogador2 = new Jogador(nomeJogador2);

    jogadorAtual = jogador1;
    setLabelJogadorAtual();

    //APOS DEFINIÇÃO DE JOGADORES, EXIBE A DIV E INICIA JOGO
    document.getElementById('canvas').style.visibility = 'visible';

}
function Jogador(nome) {
    this.nome = nome;
}



var lstanswersText = new Array();
lstanswersText.push(document.getElementById('a1'));
lstanswersText.push(document.getElementById('a2'));
lstanswersText.push(document.getElementById('a3'));
lstanswersText.push(document.getElementById('a4'));

divQuiz.style.display = 'none';

var correctAnswer = 0;

var lock = false;
var lstQuestionPosi = [145,230,325,45];

var increment = 1;
var background = new Image();
//background.src = "img/bg.jpg";
background.src = "img/tabuleiro.jpg";

var player1Img = new Image();
player1Img.src = "img/player1.png";

var player2Img = new Image();
player2Img.src = "img/player2.png";


var lstPlayer = new Array();

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    divCanvas.style.display = 'inline';
    divQuiz.style.display = 'none';

    if (lstPlayer[(idPlayer+1)%2].house != 9){
        nDice = 0;
        lstPlayer[(idPlayer+1)%2].house10 = false;
    }else{

        if (lstPlayer[(idPlayer+1)%2].house10){
            nDice = 0;
        }else{
            lstPlayer[(idPlayer+1)%2].house --;
            nDice = 1;
            increment = -1;
        }

    }

    canMove = false;

}

// Game objects
var player = {
    x: 100,
    y: 500,
    house: 0,
    image: player1Img,
    house10: false
};

var player2 = {
    x: 110,
    y: 500,
    house: 0,
    image: player2Img,
    house10: false
};

lstPlayer.push(player);
lstPlayer.push(player2);

background.onload = function(){
    showQuestion();
}


function selectLabel(idL){
    // for (i = )
    document.getElementById('rbA' + idL).checked = true;
}

function movePlayer() {
    // drawing code

    //ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0);

    var playerMove = (idPlayer+1)%2;
    var playerStay = idPlayer;

    //colocar o outro jogador na posicao correta
    ctx.drawImage(lstPlayer[playerStay].image,lstPlayer[playerStay].x+20,lstPlayer[playerStay].y);


    if (lstPlayer[playerMove].x < lstHouses[lstPlayer[playerMove].house].x){
        lstPlayer[playerMove].x += speed;
    }

    if (lstPlayer[playerMove].x > lstHouses[lstPlayer[playerMove].house].x){
        lstPlayer[playerMove].x -= speed;
    }

    if (lstPlayer[playerMove].y < lstHouses[lstPlayer[playerMove].house].y){
        lstPlayer[playerMove].y += speed;
    }

    if (lstPlayer[playerMove].y > lstHouses[lstPlayer[playerMove].house].y){
        lstPlayer[playerMove].y -= speed;
    }

    ctx.drawImage(lstPlayer[playerMove].image,lstPlayer[playerMove].x,lstPlayer[playerMove].y);

    if (lstPlayer[playerMove].x == lstHouses[lstPlayer[playerMove].house].x && lstPlayer[playerMove].y == lstHouses[lstPlayer[playerMove].house].y){
        if (nDice == 0){
            if (lstPlayer[playerMove].house == 5){
                lstPlayer[playerMove].house += increment;
                nDice=1;
            }else if (lstPlayer[playerMove].house == 17){
                console.log("banana")
                increment = -1;
                nDice = 17;
            }else {
                canMove = true;
                btnRollDice.disabled = false;
            }
        }else{
            lstPlayer[playerMove].house += increment;
            nDice--;
        }

        //console.log("IdPlayer" + idPlayer);
    }
}

setInterval(update, 15);

function update(){
    if (canMove == false){
        requestAnimationFrame(movePlayer);
    }
    //console.log(idPlayer);
}



function showQuestionDiv(){
    //Colocar perguntas (aqui tem de sortear a pergunta)
    var sorteada = randomIntFromInterval(0,lstQuestion.length-1);

    document.getElementById('pergunta').innerHTML = lstQuestion[sorteada].q;

    correctAnswer = randomIntFromInterval(0,3);
    //sortear o lugar da pergunta
    var i = 0;
    for(i = 0; i < 4; i++){
        lstanswersText[((i+correctAnswer) % 4)].innerHTML = lstQuestion[sorteada]['a' + (i+1)];
    }

    divCanvas.style.display = 'inline';
    divQuiz.style.display = 'inline';
}

function verificarResposta(){

    changePlayer();
    setLabelJogadorAtual();

    var win = false;
    if (document.getElementById('rbA1').checked == true){
        if (correctAnswer == 0){
            win = true;
        }

    }else if(document.getElementById('rbA2').checked){
        if (correctAnswer == 1){
            win = true;
        }
    }else if(document.getElementById('rbA3').checked){
        if (correctAnswer == 2){
            win = true;
        }
    }else if(document.getElementById('rbA4').checked) {
        if (correctAnswer == 3) {
            win = true;


        }
        if (win){
            divCanvas.style.display = 'inline';
            divQuiz.style.display = 'none';

            if (lstPlayer[(idPlayer+1)%2].house != 9){

                lstPlayer[(idPlayer+1)%2].house += 1;
                nDice--;
                lstPlayer[(idPlayer+1)%2].house10 = false;

            }else{
                if (lstPlayer[(idPlayer+1)%2].house10){
                    lstPlayer[(idPlayer+1)%2].house += 1;
                    nDice--;
                    lstPlayer[(idPlayer+1)%2].house10 = false;
                }else{

                    nDice = 0;
                    lstPlayer[(idPlayer+1)%2].house10 = true;
                }
                //Codigo aqui

            }

            canMove = false;

        }else{


            var modal = document.getElementById('myModal');
            modal.style.display = "block";


        }

        document.getElementById("rbA1").checked = false;
        document.getElementById("rbA2").checked = false;
        document.getElementById("rbA3").checked = false;
        document.getElementById("rbA4").checked = false;

    }

}
function showQuestion(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0);
    ctx.drawImage(player1Img,220,540);
}

ResetQ= function(){};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function rollDice(){
    btnRollDice.disabled = true;
    var die = document.getElementById("die");
    var d1 = Math.floor(Math.random() * 6) + 1;
    die.innerHTML = d1;

    increment = 1;

    //changePlayer();
    setTimeout(showQuestionDiv, 1000);
    nDice = d1;
}
function changePlayer() {
    idPlayer = (idPlayer+1)%2;
    var playerText = document.getElementById("jogadorAtual");
    playerText.innerHTML = "Jogador " + (idPlayer+1);

    document.getElementById('jogadorAtual').innerHTML = 'Jogador atual:  ' + jogadorAtual.nome;
}
function setLabelJogadorAtual(){

    console.log(jogadorAtual.nome);
}

