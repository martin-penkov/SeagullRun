class BackgroundService {
    static getBackgroundSprite(width, height) {
        const gradientTexture = PIXI.Texture.from('./sprites/background/resized.jpg')
        const gradientSprite = new PIXI.TilingSprite(
            gradientTexture,
            width,
            height
        )
    
        return gradientSprite
    }

    static getCloudSprite(width, height){
        const cloudTexture = PIXI.Texture.from('./sprites/background/clouds.png')
        const cloudSprite = new PIXI.TilingSprite(
            cloudTexture,
            width,
            height
        )
        cloudSprite.tileScale.set(0.5, 0.5)
        return cloudSprite
    }

    static getBuildingSprite(width, height){
        const buildingTexture = PIXI.Texture.from('./sprites/background/buildingBackground.png')
        const buildingSprite = new PIXI.TilingSprite(
            buildingTexture,
            width,
            height
        )
        buildingSprite.tileScale.set(0.5, 0.5)
        buildingSprite.y = window.innerHeight - 500
        return buildingSprite
    }
}