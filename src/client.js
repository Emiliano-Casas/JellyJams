import Phaser from "phaser";
// import TitleScreen from "./TitleScreen";
import GameScreen from "./GameScreen";

const oGameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#f0f8ff',
    // DIST 
    width: 640,
    height: 640,
    // scale: {
    //     parent: 'canvasParent',
    //     mode: Phaser.Scale.FIT
    // }

    // // DEV
    // width: 640,
    // height: 360,

};

const oGame = new Phaser.Game(oGameConfig);

// oGame.scene.add('titleScreen', TitleScreen);
oGame.scene.add('gameScreen', GameScreen);

oGame.scene.start('gameScreen');