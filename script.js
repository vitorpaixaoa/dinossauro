const dino = document.querySelector( ".dino" );
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let ponto = 0;

function jogarNovamente(){
    document.location.reload();
}
function pressionarTecla(event){
    if( event.keyCode ===  32 ){
        if (!isJumping) {
            jump();
        }
    } 
}

function jogar() {
    document.querySelector('.iniciar').style.display = 'none';
    createCactus();
}

function removerInst(){
    var msg = document.getElementById("instrucoes");
        msg.parentNode.removeChild(msg);   
}

function jump () {
    isJumping = true;
    let upInterval =  setInterval(() => {
        
        if( position >= 150){
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if( position <= 0 ){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            },20)
        }else {
            //subindo
            position  += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 20)
}

// cactus

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus'); 
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if( cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            ponto ++ 
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60 ){
            //Game over
            clearInterval(leftInterval)
            document.body.innerHTML = 
            '<h1 class="game-over"> Fim de jogo </h1><br/> <p> Você fez '+ ponto+' pontos</p> <button class="btn" onClick="jogarNovamente()">Jogar novamente</button> ';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    },20)

    setTimeout(createCactus, randomTime)

}

document.addEventListener('keyup', pressionarTecla )