import Phaser from "phaser";

class GameScene extends Phaser.Scene {

    preload() {
        // this.add.text(200,200,"Game SCreen");

        this.load.atlas(
            'knightAttack',
            "./assets/knightAttack.png",
            "./assets/knightAttackFull.json"
        );


    }

    create() {

        // CREATE ANIMATIONS
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
        const aAttack1 = this.anims.generateFrameNames('knightAttack', {
            prefix: 'knightAttack-',
            start: 0,
            end: 9,
            suffix: '.png'
        });
        this.anims.create({
            key: 'knightAttack1',
            frames: aAttack1,
            duration: 800
        });
        console.log(aAttack1);

        // Add sprites
        const oKnight = this.add.sprite(50, 50, 'knightAttack');

        // Map keys
        const oSpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        oSpaceKey.on("down", (key, event) => {
            oKnight.play('knightAttack1');

        });
    }
}

export default GameScene;