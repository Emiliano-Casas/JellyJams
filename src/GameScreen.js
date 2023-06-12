import Phaser from "phaser";

class GameScene extends Phaser.Scene {

    preload() {
        this.load.image('background', './assets/background.jpg');
        this.preloadWiz();
        this.preloadSlime();
    }

    create() {
        this.add.image(320, 320, 'background');
        this.createWiz();
        this.createSlime();
    }


    // --------------------------------------------
    // SLIME
    // --------------------------------------------
    preloadSlime() {
        this.load.atlas(
            'slimeSprite',
            './assets/slime.png',
            './assets/slime.json'
        )
    }

    createSlime() {
        // const oSlime = this.add.sprite(320, 320, 'slimeSprite');

        const oSlime = this.physics.add.sprite(320, 320, 'slimeSprite');
        oSlime.setVelocity(20,30);

        // --------------------------------------------------------------
        // Create Animations
        // --------------------------------------------------------------
        this.anims.create({
            key: 'slimeSpawn',
            frames: this.anims.generateFrameNames(
                'slimeSprite',
                {
                    prefix: "slime-",
                    start: 0,
                    end: 10,
                    suffix: '.png'
                }),
            duration: 1100,
        });
        this.anims.create({
            key: 'slimeBounce',
            frames: this.anims.generateFrameNames(
                'slimeSprite',
                {
                    prefix: "slime-",
                    start: 11,
                    end: 16,
                    suffix: '.png'
                }),
            duration: 600,
            repeat: 9
        });
        this.anims.create({
            key: 'slimeDie',
            frames: this.anims.generateFrameNames(
                'slimeSprite',
                {
                    prefix: "slime-",
                    start: 17,
                    end: 24,
                    suffix: '.png'
                }),
            duration: 800,
            hideOnComplete: true // Should delete slime object after this
        });
        // --------------------------------------------------------------
        // Set Animation Triggers
        // --------------------------------------------------------------
        oSlime.play('slimeSpawn')
            .anims.chain('slimeBounce')
            .anims.chain('slimeDie')
    }


    // --------------------------------------------
    // WIZARD
    // --------------------------------------------
    preloadWiz() {
        // Idle
        this.load.atlas(
            'wizIdleRightSprite',
            "./assets/WizIdleRight.png",
            "./assets/WizIdleRight.json"
        );
        // Attack2
        this.load.atlas(
            'wizAttack2RightSprite',
            "./assets/WizAttack2Right.png",
            "./assets/WizAttack2Right.json"
        );
    }

    createWiz() {
        // --------------------------------------------------------------
        // Add Objects
        // --------------------------------------------------------------
        const oWiz = this.add.sprite(320, 570, 'wizAttack1Sprite');
        // --------------------------------------------------------------
        // Create Animations
        // --------------------------------------------------------------
        // Idle
        this.anims.create({
            key: 'wizIdleRight',
            frames: this.anims.generateFrameNames('wizIdleRightSprite', {
                prefix: 'IdleRight-',
                start: 0,
                end: 7,
                suffix: '.png'
            }),
            duration: 700,
            repeat: -1,
        });
        // Attack 2 anim
        this.anims.create({
            key: 'wizAttack2Right',
            frames: this.anims.generateFrameNames('wizAttack2RightSprite', {
                prefix: 'Attack2Right-',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            duration: 300
        });
        // Hold anim
        this.anims.create({
            key: 'wizHoldStaff',
            frames: this.anims.generateFrameNames('wizAttack2RightSprite', {
                prefix: 'Attack2Right-',
                start: 1,
                end: 3,
                suffix: '.png'
            }),
            duration: 300,
            repeat: -1,

        });
        // Smash
        this.anims.create({
            key: 'wizSmash',
            frames: this.anims.generateFrameNames('wizAttack2RightSprite', {
                prefix: 'Attack2Right-',
                start: 4,
                end: 7,
                suffix: '.png'
            }),
            duration: 400
        });
        // --------------------------------------------------------------
        // Set Animation Triggers
        // --------------------------------------------------------------
        const oKeyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        // Attack 2 trigger
        oKeyH.on("down", (key, event) => {
            oWiz.play('wizAttack2Right');
        });
        // Hold trigger
        oWiz.on('animationcomplete-wizAttack2Right', function () {
            if (oKeyH.isDown) {
                oWiz.play('wizHoldStaff');
            } else {
                oWiz.play('wizIdleRight');
            }
        }.bind(this));
        // Smash trigger
        oKeyH.on("up", () => {
            if ('wizHoldStaff' == oWiz.anims.currentAnim.key) {
                oWiz.play('wizSmash').anims.chain('wizIdleRight');
            }
        });
        // Add sprites
        oWiz.play('wizIdleRight');
    }
}

export default GameScene;