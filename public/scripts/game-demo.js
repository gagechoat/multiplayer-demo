var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

}

var player;
var player2;
var platforms;
var cursors;
var jumpButton;

function create() {

    player = game.add.sprite(100, 200, 'player');
    player2 = game.add.sprite(400, 200, 'player');

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(player2);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    player2.body.collideWorldBounds = true;
    player2.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    cursors2 = {
      left: game.input.keyboard.addKey(Phaser.Keyboard.J),
      right: game.input.keyboard.addKey(Phaser.Keyboard.L)
      //right: game.input.keyboard.addKey( 76 )
    };
    jumpButton2 = game.input.keyboard.addKey(Phaser.Keyboard.I);

}

function update () {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player2, platforms);
    game.physics.arcade.collide(player, player2);

    player.body.velocity.x = 0;
    player2.body.velocity.x = 0;

    // player 1
    //if (cursors.left.isDown)
    if ( isKeyDown(37) )
    {
        player.body.velocity.x = -250;
    }
    //else if (cursors.right.isDown)
    else if ( isKeyDown(39) )
    {
        player.body.velocity.x = 250;
    }
    //if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    if ( isKeyDown(38) )
    {
        player.body.velocity.y = -400;
    }

    // player 2
    //if (cursors2.left.isDown)
    if ( isKeyDown(74) )
    {
        player2.body.velocity.x = -250;
    }
    //else if (cursors2.right.isDown)
    else if ( isKeyDown(76) )
    {
        player2.body.velocity.x = 250;
    }
    //if (jumpButton2.isDown && (player2.body.onFloor() || player2.body.touching.down))
    if ( isKeyDown(73) && ( player2.body.onFloor() || player2.body.touching.down ) )
    {
        player2.body.velocity.y = -400;
    }
}
