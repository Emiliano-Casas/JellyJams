import Phaser from "phaser";

class GameScene extends Phaser.Scene {

    preload() {
        // this.add.text(200,200,"Game SCreen");

        this.load.atlas(
            'knightAttack',
            "./assets/knightAttack.png",
            "./assets/knightAttack.json"
        );

        
    }

    create() {

        // Create animations
        // Attacks 1, 2 and 3
        this.anims.create({
            key: 'knightAttackFull',
            frames: this.anims.generateFrameNames('knightAttack', {
                prefix: 'knightAttack-',
                start: 0,
                end: 21,
                suffix: '.png'
            }),
            repeat: -1,
            duration: 2100
        });

        // Attack 1
        this.anims.create({
            key: 'knightAttack1',
            frames: this.anims.generateFrameNames('knightAttack', {
                prefix: 'knightAttack-',
                start: 0,
                end:8,
                suffix: '.png'
            }),
            duration: 800
        });
        
        // Add sprites
        const oKnight = this.add.sprite(50, 50, 'knightAttack');

        // Map keys
        const oSpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        oSpaceKey.on("down", (key, event) => {
            oKnight.play('knightAttack1');

        });

        // oKnight.play('knightAttackFull');
    }
}

export default GameScene;