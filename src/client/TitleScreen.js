import Phaser from "phaser";

class TitleScreen extends Phaser.Scene {
    create() {
        this.add.text(200,200,"Title SCreen");
    }
}

export default TitleScreen;