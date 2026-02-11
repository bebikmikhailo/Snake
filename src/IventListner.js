export class IventListner {
    constructor(game) {
        this.game = game;
        this.isAnyKeyWasPressed = false;


        window.addEventListener("keydown", (ev) => {
            if (!this.game.isRun) {
                this.game.start();
            }

            this.game.lastKeyPressed = ev.key;
        })
    }
}