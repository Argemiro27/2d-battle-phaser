const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

let player;
let player2;
let cursors;
let isAttacking = false; 
let isAttacking2 = false;
let lifePlayer = 100;
let lifePlayer2 = 100;
let isDefending = false; 
let lifeText;
let lifeText2;
let attackSound;
let deadSound;
let backgroundMusic; 
let groundY = 500;  

function preload() {
    this.load.image('idle_person1', 'assets/person1/idle.png');
    this.load.image('attack_1_person1', 'assets/person1/attack_1.png');
    this.load.image('attack_2_person1', 'assets/person1/attack_2.png');
    this.load.image('attack_3_person1', 'assets/person1/attack_3.png');
    this.load.image('attack_4_person1', 'assets/person1/attack_4.png');
    this.load.image('dead_person1', 'assets/person1/dead.png'); 

    this.load.image('idle', 'assets/person2/idle.png');
    this.load.image('attack_1', 'assets/person2/attack_1.png');
    this.load.image('attack_2', 'assets/person2/attack_2.png');
    this.load.image('attack_3', 'assets/person2/attack_3.png');
    this.load.image('dead_person2', 'assets/person2/dead.png');  

    this.load.image('background', 'assets/castle.jpg');
    this.load.audio('attackSound', 'assets/songs/song_sword.mp3');
    this.load.audio('deadSound', 'assets/songs/dead.mp3');
    this.load.audio('backgroundMusic', 'assets/songs/background.mp3'); 
    this.load.audio('fightSound', 'assets/songs/fight.mp3'); 
}

function create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1);
    
    groundY = background.height - 110; 

    player2 = this.physics.add.sprite(250, groundY, 'idle_person1'); 
    player2.setCollideWorldBounds(true);
    player2.setScale(1.5); 
    
    this.anims.create({
        key: 'attack_person1',
        frames: [
            { key: 'attack_1_person1' },
            { key: 'attack_2_person1' },
            { key: 'attack_3_person1' },
            { key: 'attack_4_person1' }
        ],
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'idle_person1',
        frames: [{ key: 'idle_person1' }],
        frameRate: 1
    });

    player = this.physics.add.sprite(340, groundY, 'idle');
    player.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'attack',
        frames: [
            { key: 'attack_1' },
            { key: 'attack_2' },
            { key: 'attack_3' }
        ],
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'idle',
        frames: [{ key: 'idle' }],
        frameRate: 1
    });

    lifeText = this.add.text(20, 20, `Player Life: ${lifePlayer}`, {
        fontSize: '24px',
        fill: '#fff'
    });

    lifeText2 = this.add.text(20, 60, `Player2 Life: ${lifePlayer2}`, {
        fontSize: '24px',
        fill: '#fff'
    });

    attackSound = this.sound.add('attackSound'); 
    deadSound = this.sound.add('deadSound'); 
    backgroundMusic = this.sound.add('backgroundMusic');
    fightSound = this.sound.add('fightSound'); 
    
    backgroundMusic.setLoop(true); 
    backgroundMusic.play();
    backgroundMusic.setVolume(0.3);
    fightSound.play();

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-D', startAttack, this);
    this.input.keyboard.on('keydown-A', startAttackPlayer2, this); 
}

function update() {
    if (isAttacking && !player.anims.isPlaying) {
        player.anims.play('idle');
        isAttacking = false;
    }

    if (isAttacking2 && !player2.anims.isPlaying) {
        player2.anims.play('idle_person1');
        isAttacking2 = false;
    }

    lifeText.setText(`Jogador 1: ${lifePlayer2}`);
    lifeText2.setText(`Jogador 2: ${lifePlayer}`);
}

function startAttack() {
    if (!isAttacking) {
        isAttacking = true;
        lifePlayer2 -= 10;

        if (lifePlayer2 <= 0) {
            lifePlayer2 = 0;
            alert("PLAYER 1 MORREU!");

            player2.setVisible(false); 
            this.add.sprite(player2.x, groundY, 'dead_person1').setOrigin(0, 0).setScale(1.5); 
            player2.setActive(false);
            deadSound.play();
        }
        player.anims.play('attack');
        attackSound.play();
    }
}

function startAttackPlayer2() {
    if (!isAttacking2) {
        isAttacking2 = true;
        lifePlayer -= 10;

        if (lifePlayer <= 0) {
            lifePlayer = 0;
            alert("PLAYER 2 MORREU!");

            player.setVisible(false); 
            this.add.sprite(player.x, groundY, 'dead_person2').setOrigin(0, 0);
            player.setActive(false); 
            deadSound.play();
        }
        player2.anims.play('attack_person1');
        attackSound.play();
    }
}
