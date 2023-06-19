import Phaser from "phaser";
import { toASCII } from "punycode";

class GameScene extends Phaser.Scene {

    aNotes = []

    preload() {
        this.load.image('background', './assets/background.jpg');
        this.preloadWiz();
        this.preloadSlime();
        this.load.audio('metro', './assets/metro_180bpm_5min.mp3');
        this.preloadTrack();
    }

    preloadSlime() {
        this.load.atlas(
            'slimeSprite',
            './assets/slime.png',
            './assets/slime.json'
        )
    }

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

    create() {
        this.add.image(320, 320, 'background');
        this.add.text(80, 320, "--------------------------------------------------");
        this.add.text(80, 520, "--------------------------------------------------");
        this.add.text(80, 544, "--------------------------------------------------");

        this.createWiz();
        // this.createSlime();

        this.createTrack();
    }

    update(time, delta) {
        // console.log("time");
        // console.log(time);
        // console.log("delta");
        // console.log(delta);
    }

    createTrack() {
        const music = this.sound.add('metro');

        const timeline = this.add.timeline([
            {
                at: 0
            }
        ]);

        music.play();
    }

    createSlime() {
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
            duration: 1000,
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
            duration: 500,
            repeat: 16
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
        });

        this.slimeSpawnLoop();
    }

    slimeSpawnLoop() {
        // --------------------------------------------------------------
        // Create slime object
        // --------------------------------------------------------------
        const oSlime = this.physics.add.sprite(320, 320, 'slimeSprite');
        oSlime.index = this.aNotes.push(oSlime) - 1;
        console.log(this.aNotes);

        oSlime.on('animationcomplete-slimeDie', () => {
            this.aNotes.splice(oSlime.index, 1);
            oSlime.destroy();
        });
        oSlime.on('animationcomplete-slimeSpawn', () => {
            oSlime.setVelocity(20, 40);
            oSlime.play('slimeBounce');
        });
        oSlime.on('animationcomplete-slimeBounce', () => {
            console.log("slime index " + oSlime.index);
            this.aNotes.splice(oSlime.index, 1);
            oSlime.destroy();
        });
        oSlime.play('slimeSpawn');

        // setTimeout(this.slimeSpawnLoop.bind(this), 2500); // DELETE THIS

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
        oWiz.on('animationcomplete-wizAttack2Right', () => {
            if (oKeyH.isDown) {
                oWiz.play('wizHoldStaff');
            } else {
                oWiz.play('wizIdleRight');
            }
        });
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