export const playerService = {
    setPlayerSprite,
    setPlayerSettings
}

function setPlayerSprite(loader){
    let sheet = loader.resources["./sprites/player/seagull.json"];
    //pattern for images <name>_<number>.png
    const textureArr = [];
    for (let i = 0; i < 8; i++)
    {
        const texture = PIXI.Texture.from(`tile_00${i}.png`);
        textureArr.push(texture);
    }

    return new PIXI.AnimatedSprite(textureArr);
}

function setPlayerSettings(player, defaultPos){
    //set player position and animation speed
    player.position.set(100, defaultPos);
    player.anchor.x = 1;
    player.scale.set(-3, 3);

    player.play();
    player.animationSpeed = 0.15;
}