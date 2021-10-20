export const bombService = {
    getBombSprite,
    setBombSettings
}

function getBombSprite(loader) {
    let sheet = loader.resources["dron"];
    //pattern for images <name>_<number>.png
    const textureArr = [];
    for (let i = 0; i < 10; i++)
    {
        const texture = PIXI.Texture.from(`dron_00${i}.png`);
        textureArr.push(texture);
    }
    let bombSprite = new PIXI.AnimatedSprite(textureArr);
    
    return bombSprite
}

function setBombSettings(bombSprite, height){
    //set bomb position and animation speed
    bombSprite.position.set(window.innerWidth + 170, height)
    bombSprite.anchor.x = 1;
    bombSprite.scale.set(3, 3);
    bombSprite.play();
    bombSprite.animationSpeed = 0.15;
}