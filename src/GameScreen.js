import Phaser from "phaser";

class GameScene extends Phaser.Scene {

    aNotes = [];
    oPos = {
        slimAttack1: { x: 384, y: 500 },
        slimInit: { x: 256, y: 500 },
        slimRightJump: { x1: 299, x2: 341 },
        slimRightBack: { x1: 341, x2: 299 }
    };
    oTime = {
        jToHit: { total: 215, jumpFact: 0.4, attackFact: 0.6 },
        jumpBackTimeout: null
    };
    oRhythm = {
        bRightAtt: true
    }

    preload() {

        this.load.image('background', './assets/background.jpg');
        // Audio        
        this.load.audio('metro', './assets/metro_180bpm_5min.mp3');
        // Slime boy
        this.load.atlas(
            'slimIdle1Sprite',
            './assets/slimIdle1/slimIdle1.png',
            './assets/slimIdle1/slimIdle1.json'
        );
        this.load.atlas(
            'slimRightJumpSprite',
            './assets/slimRightJump/slimRightJump.png',
            './assets/slimRightJump/slimRightJump.json'
        );
        this.load.atlas(
            'slimRightBackSprite',
            './assets/slimRightBack/slimRightBack.png',
            './assets/slimRightBack/slimRightBack.json'
        );
        this.load.atlas(
            'slimAttack10Sprite',
            './assets/slimAttack10/slimAttack10.png',
            './assets/slimAttack10/slimAttack10.json'
        );
        this.load.atlas(
            'slimAttack11Sprite',
            './assets/slimAttack11/slimAttack11.png',
            './assets/slimAttack11/slimAttack11.json'
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

        // // TESTING INPUTS
        // const element = this.add.dom(320, 320).createFromCache('form');

        // this.createWiz();
        this.createslim();
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

    createslim() {
        const oSlim = this.add.sprite(
            this.oPos.slimInit.x,
            this.oPos.slimInit.y,
            'slimIdle1Sprite');
        oSlim.setOrigin(0, 0);

        // animations
        this.anims.create({
            key: 'slimIdle1',
            frames: this.anims.generateFrameNames(
                'slimIdle1Sprite',
                {
                    prefix: 'slimIdle1-',
                    start: 0,
                    end: 1,
                    suffix: '.png'
                }),
            duration: 1000,
            repeat: -1
        });
        this.anims.create({
            key: 'slimRightJump',
            frames: this.anims.generateFrameNames(
                'slimRightJumpSprite',
                {
                    prefix: 'slimRightJump-',
                    start: 0,
                    end: 2,
                    suffix: '.png'
                }),
            duration: this.oTime.jToHit.total * this.oTime.jToHit.jumpFact,
        });
        this.anims.create({
            key: 'slimRightBack',
            frames: this.anims.generateFrameNames(
                'slimRightBackSprite',
                {
                    prefix: 'slimRightBack-',
                    start: 0,
                    end: 2,
                    suffix: '.png'
                }),
            duration: this.oTime.jToHit.total * this.oTime.jToHit.jumpFact,
        });
        this.anims.create({
            key: 'slimAttack10',
            frames: this.anims.generateFrameNames(
                'slimAttack10Sprite',
                {
                    prefix: 'slimAttack10-',
                    start: 0,
                    end: 2,
                    suffix: '.png'
                }),
            duration: this.oTime.jToHit.total * this.oTime.jToHit.attackFact,
        });
        this.anims.create({
            key: 'slimAttack11',
            frames: this.anims.generateFrameNames(
                'slimAttack11Sprite',
                {
                    prefix: 'slimAttack11-',
                    start: 0,
                    end: 2,
                    suffix: '.png'
                }),
            duration: this.oTime.jToHit.total * this.oTime.jToHit.attackFact,
        });

        // Move slim
        oSlim.on('animationupdate', (oAnim, oFrame, oSprite) => {
            const iJumpDiff = this.oPos.slimAttack1.x - this.oPos.slimInit.x;
            if (oAnim.key === 'slimRightJump') {
                oSprite.x = this.oPos.slimInit.x + iJumpDiff * oFrame.progress;
            } else if (oAnim.key === 'slimRightBack') {
                oSprite.x = this.oPos.slimAttack1.x - iJumpDiff * oFrame.progress;
            }
        });
        oSlim.on('animationstart', (oAnim) => {
            switch (oAnim.key) {
                case 'slimAttack10':
                    this.oRhythm.bRightAtt = false;
                    oSlim.x = this.oPos.slimAttack1.x;
                    oSlim.y = this.oPos.slimAttack1.y;
                    break;
                case 'slimAttack11':
                    this.oRhythm.bRightAtt = true;
                    break;
            }
        });

        // Attack J
        const oJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        oJ.on("down", () => {
            if (oSlim.x === this.oPos.slimAttack1.x) {
                // In attack position x
                // if (oSlim.texture.key === 'slimAttack10Sprite') {
                if (this.oRhythm.bRightAtt) {
                    oSlim.play('slimAttack10');
                } else {
                    oSlim.play('slimAttack11');
                }
            } else {
                oSlim.play('slimRightJump');
            }
        });
        oSlim.on('animationcomplete-slimRightJump', () => {
            oSlim.play('slimAttack10');
        });
        oSlim.on('animationcomplete-slimAttack10', () => {
            oSlim.play('slimIdle1');
            this.oTime.jumpBackTimeout = setTimeout(() => {
                oSlim.play('slimRightBack');
            }, 500);
        });
        oSlim.on('animationcomplete-slimAttack11', () => {
            oSlim.play('slimIdle1');
            this.oTime.jumpBackTimeout = setTimeout(() => {
                oSlim.play('slimRightBack');
            }, 500);
        });

        // Attack F
        const oKeyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        oKeyF.on("down", () => {
            oSlim.play('slimRightBack');
        });
        oSlim.on('animationcomplete-slimRightBack', () => {
            oSlim.x = this.oPos.slimInit.x;
            oSlim.y = this.oPos.slimInit.y;
            oSlim.play('slimIdle1');
        });

        // Hit/miss
        oSlim.on('animationstart', (animation) => {
            if (animation.key === 'slimAttack10' | animation.key === 'slimAttack11') {
                clearTimeout(this.oTime.jumpBackTimeout);
                this.swing('slimAttack1');
            }
        });

        // Idle
        oSlim.play("slimIdle1");
    }

    swing(sAnimation) {
        this.aNotes.forEach((oSprite) => {
            if (520 < oSprite.y & oSprite.y < 544 & sAnimation) {

                // Right track
                if (sAnimation === 'slimAttack1') {
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