export class IventListner {
    constructor(game) {
        this.game = game;
        window.addEventListener("keydown", (ev) => {
          this.game.lastKeyPressed = ev.key;
        })
    }
}