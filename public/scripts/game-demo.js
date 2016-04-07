var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

}

var playerDefaults = {
  jump: 400,
  gravity: 750,
  speed: 250,
  y: 200
};

var player = [
    {
      gravity: playerDefaults.gravity,
      jump: playerDefaults.jump,
      keys: {
        left: 65,
        right: 68,
        jump: 87
      },
      speed: 0.5*playerDefaults.speed,
      x: 100,
      y: playerDefaults.y
    },
    {
      gravity: playerDefaults.gravity,
      jump: playerDefaults.jump,
      keys: {
        left: 74,
        right: 76,
        jump: 73
      },
      speed: playerDefaults.speed,
      x: 400,
      y: 200
    },
    {
      gravity: playerDefaults.gravity,
      jump: playerDefaults.jump,
      keys: {
        left: 37,
        right: 39,
        jump: 38
      },
      speed: 1.5*playerDefaults.speed,
      x: 700,
      y: 200,
    }
]
var platforms;
var cursors;
var jumpButton;

function create() {
    for ( var i = 0; i < player.length; i++) {
      player[i].sprite = game.add.sprite( player[i].x, player[i].y, 'player' );
      game.physics.arcade.enable( player[i].sprite );
      player[i].sprite.body.collideWorldBounds = true;
      player[i].sprite.body.gravity.y = player[i].gravity;
    }

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);
}

function update () {
    for ( var i = 0; i < player.length; i++) {
      game.physics.arcade.collide( player[i].sprite, platforms );
      for ( var j = player.length - 1; j > i; j-- ) {
        game.physics.arcade.collide( player[i].sprite, player[j].sprite );
      }

      player[i].sprite.body.velocity.x = 0

      if ( isKeyDown( player[i].keys.left ) ) {
        player[i].sprite.body.velocity.x = -1*player[i].speed;
      } else if ( isKeyDown( player[i].keys.right ) ) {
        player[i].sprite.body.velocity.x = player[i].speed;
      }

      if ( isKeyDown( player[i].keys.jump )  && ( player[i].sprite.body.onFloor() || player[i].sprite.body.touching.down ) ) {
        player[i].sprite.body.velocity.y = -1*player[i].jump;
      }
    }
}
