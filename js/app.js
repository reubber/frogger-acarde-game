//* Inimigos que o jogador deve evitar

let Enemy = class Enemy {
    constructor(cordx, cordy, vel) {

        this.cordx = cordx;
        this.cordy = cordy;
        this.vel = vel;
        // A imagem dos inimigos, this usa uma classe helper que carrega
        // a imagem facilmente
        this.sprite = 'images/inseto.png';
    }
};

// Atualiza a posição de um inimigo
// Parâmetro: dt, um intervalo de tempo entre atualizações
Enemy.prototype.update = function (dt) {
    // Você deve multiplicar cada movimento por dt
    this.cordx += this.vel * dt;
    // assegura que o jogo rode na mesma velocidade em todos computadores.

    // Aos inimigos que estao fora do canvas, irao reaparecer randomicamente com diferentes velocidades.
    if (this.cordx > 510) {
        this.cordx = -50;
        this.vel = 100 + Math.floor(Math.random() * 222);
    };

    // verifica colisoes entre o player eos inimigos.
    if (player.cordx < this.cordx + 80 &&
        player.cordx + 80 > this.cordx &&
        player.cordy < this.cordy + 60 &&
        60 + player.cordy > this.cordy) {
        player.cordx = 202;
        player.cordy = 405;
    };
};

// Desenha o inimigo na tela
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.cordx, this.cordy);
};

// Agora escreva a class Player
// Ela requer os métodos update(), render() e handleInput().

let Player = class Player {
    constructor(cordx, cordy) {

        this.cordx = cordx;
        this.cordy = cordy;

        // A imagem do jogador, this usa uma classe helper que carrega
        // a imagem facilmente
        this.player = 'images/personagem-garoto.png';
    }
};

Player.prototype.update = function (dt) {

};

// renderiza a imagem do jogador
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.cordx, this.cordy);
};


Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.cordx > 0) {
        this.cordx -= 102;
    } else if (keyPress == 'right' && this.cordx < 405) {
        this.cordx += 102;
    };

    if (keyPress == 'up' && this.cordy > 0) {
        this.cordy -= 83;
    } else if (keyPress == 'down' && this.cordy < 405) {
        this.cordy += 83;
    };

// Uma vez no topo, na agua, o usuario é instanteneamente realocado para o local de partida
    if (this.cordy < 0) {
        setTimeout(() => {
            this.cordx = 202;
            this.cordy = 405;
        }, 800);
    };
};

// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em um array chamado allEnemies
var allEnemies = [];

var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (cordY) {
    enemy = new Enemy(0, cordY, 200);
    allEnemies.push(enemy);
});

// Coloque o jogador em uma variável chamada player
var player = new Player(202, 405);

// Esta função escuta pela tecla pressionada e envia a tecla para o método
// Player.handleInput(). Você não precisa modificar.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
