export class IventListner {
    constructor(game) {
        this.game = game;
        this.keysPressed = [];
        this.isAnyKeyWasPressed = false;


        window.addEventListener("keydown", (ev) => {
            if (!this.game.isRun) {
                this.game.start();
            }

            if (this.keysPressed.length < 2 && !this.keysPressed.includes(ev.key)) {
                this.keysPressed.push(ev.key);
            }
        })
    }

    getLastPressedKey() {
        const lastKeyPressed = this.keysPressed[0];
        this.keysPressed.splice(0, 1);
        return lastKeyPressed;
    }
}