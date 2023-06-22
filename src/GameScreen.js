import Phaser from "phaser";

class GameScene extends Phaser.Scene {

    aNotes = [];

    preload() {
        this.load.image('background', './assets/background.jpg');
        // Audio        
        this.load.audio('metro', './assets/metro_180bpm_5min.mp3');
        // Slime boy
        this.load.atlas(
            'slimeboyAttack1Sprite',
            './assets/slimeboyAttack1.png',
            './assets/slimeboyAttack1.json'
        );

        // Slime
        this.load.atlas(
            'slimeSprite',
            './assets/slime.png',
            './assets/slime.json'
        );
        // Demon
        this.load.atlas(
            'demonSprite',
            './assets/demon.png',
            './assets/demon.json'
        );
        //  Wiz Idle
        this.load.atlas(
            'wizIdleRightSprite',
            "./assets/WizIdleRight.png",
            "./assets/WizIdleRight.json"
        );
        // Wiz Attack2
        this.load.atlas(
            'wizAttack2RightSprite',
            "./assets/WizAttack2Right.png",
            "./assets/WizAttack2Right.json"
        );
    };

    create() {
        this.add.image(320, 320, 'background');
        this.add.text(80, 320, "--------------------------------------------------");
        this.add.text(80, 520, "--------------------------------------------------");
        this.add.text(80, 544, "--------------------------------------------------");

        // this.createWiz();
        this.createSlimeboy();
        this.slimeAnimations();
        this.demonAnimations();

        this.createTrack().play();
        this.cleanNotes();
    };

    createTrack() {
        const music = this.sound.add('metro');
        const aTimeline = [
            {
                at: 0,
                sound: 'metro',
                run: () => { music.play() }
            }
        ];
        for (var i = 0; i < 200; i++) {
            aTimeline.push({
                at: i * 1333.333,
                run: this.createSlime.bind(this)
            }, {
                at: i * 3999.999,
                run: this.createDemon.bind(this)
            });
        }

        return this.add.timeline(aTimeline);
    };

    cleanNotes() {
        this.aNotes.forEach((ele, index) => {
            const ayylmao = ele;
        });
    };

    createSlimeboy() {
        const oSlimeboy = this.physics.add.sprite(452, 545, 'slimeboyAttack1Sprite');

        // animations
        this.anims.create({
            key: 'slimeboyAttack1',
            frames: this.anims.generateFrameNames(
                'slimeboyAttack1Sprite',
                {
                    prefix: 'slimeboyAttack1-',
                    start: 0,
                    end: 2,
                    suffix: '.png'
                }),
            duration: 150
            ,yoyo: true
        });

        const oKeyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        // Attack 1
        oKeyH.on("down", () => {
            oSlimeboy.play('slimeboyAttack1');
        });
        // Hit/miss
        oSlimeboy.on('animationstart', (animation) => {
            if (animation.key === 'slimeboyAttack1') {
                this.swing('slimeboyAttack1');
            }
        });

    }

    swing(sAnimation) {
        this.aNotes.forEach((oSprite) => {
            if (520 < oSprite.y & oSprite.y < 544 & sAnimation) {

                // Right track
                if (sAnimation === 'slimeboyAttack1') {
                    switch (oSprite.texture.key) {
                        case 'slimeSprite':
                            oSprite.play('slimeDie');
                            break;
                    }
                }

                // //Left track
                // if (sAnimation === '') {
                //     switch (oSprite.texture.key) {
                //         case '':
                //             oSprite.play('');
                //             break;
                //     }
                // }
            }
        });
    }

    demonAnimations() {
        this.anims.create({
            key: 'demonIdle',
            frames: this.anims.generateFrameNames(
                'demonSprite',
                {
                    prefix: 'demon-',
                    start: 0,
                    end: 5,
                    suffix: '.png'
                }),
            duration: 1333.333,
            repeat: 10
        });
    };

    createDemon() {
        const oDemon = this.physics.add.sprite(280, 320, 'demonSprite');
        this.aNotes.push(oDemon);
        oDemon.on('animationcomplete-demonIdle', () => {
            oDemon.destroy();
        })
        oDemon.setVelocity(-10, 20);
        oDemon.play('demonIdle');
    };

    slimeAnimations() {
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
            duration: 333.3333,
            repeat: 22
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
    };

    createSlime() {
        const oSlime = this.physics.add.sprite(360, 320, 'slimeSprite');
        this.aNotes.push(oSlime);
        oSlime.on('animationcomplete-slimeDie', () => {
            oSlime.destroy();
        });
        oSlime.on('animationcomplete-slimeSpawn', () => {
            oSlime.setVelocity(20, 40);
            oSlime.play('slimeBounce');
        });
        oSlime.on('animationcomplete-slimeBounce', () => {
            oSlime.destroy();
        });
        oSlime.setVelocity(10, 40);
        oSlime.play('slimeBounce');

        // setTimeout(this.slimeSpawnLoop.bind(this), 2500); // DELETE THIS

    };

    createWiz() {
        const oWiz = this.add.sprite(320, 570, 'wizAttack1Sprite');
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
        oKeyH.on("down", () => {
            oWiz.play('wizAttack2Right');
        });
        // Hit/miss
        oWiz.on('animationstart', (animation) => {
            if (animation.key == 'wizAttack2Right') {
                this.swing('wizAttack2Right');
            }
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
    };

}
export default GameScene;