import Phaser from "phaser";
// import TitleScreen from "./TitleScreen";
import GameScreen from "./GameScreen";

const oGameConfig = {
    width: 320,
    height: 180,
    type: Phaser.AUTO,
    backgroundColor: '#f0f8ff',
    scale: {
        parent: 'canvasParent',
        mode: Phaser.Scale.FIT
    }
};

const oGame = new Phaser.Game(oGameConfig);

// oGame.scene.add('titleScreen', TitleScreen);
oGame.scene.add('gameScreen', GameScreen);

oGame.scene.start('gameScreen');