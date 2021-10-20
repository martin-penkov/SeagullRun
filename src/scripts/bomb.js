export const bombService = {
getBombSprite
}

function getBombSprite(height) {
    const bomb  = new PIXI.Graphics();
    bomb.beginFill(0xFF0000);
    bomb.drawCircle(30, 30, 30);
    bomb.endFill();
    bomb.position.set(600, height + 100)
    return bomb;
}